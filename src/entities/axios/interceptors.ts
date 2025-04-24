import { AxiosError, AxiosRequestConfig } from "axios";
import { axiosInstance } from "./baseHttpClient";
import { getAccessToken, setAccessToken, removeAccessToken } from "./tokenStorage";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

 
let refreshSubscribers: ((token: string) => void)[] = [];
let isRefreshing = false;

// 요청 인터셉터 - accessToken 붙이기
axiosInstance.interceptors.request.use(config => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터 - accessToken 만료 시 재발급 로직
axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const res = await axiosInstance.post("/auth/refresh", {}, { withCredentials: true });

          const newAccessToken = res.data.accessToken;
          setAccessToken(newAccessToken);

          refreshSubscribers.forEach(callback => callback(newAccessToken));
          refreshSubscribers = [];

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          removeAccessToken();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise(resolve => {
        refreshSubscribers.push((token: string) => {
          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
          }
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);
