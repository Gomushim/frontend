import axios from "axios";
import { handleAPIError, handleCheckAndSetToken } from "./interceptor";

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  console.log("🚀 [Axios 요청] URL:", config.url);
  console.log("📌 [Axios 요청] Method:", config.method?.toUpperCase());
  console.log("🛠 [Axios 요청] Headers:", config.headers);
  console.log("📤 [Axios 요청] Data:", config.data);
  return config;
});

export function get<T>(...args: Parameters<typeof api.get>) {
  return api.get<T>(...args).then((res) => res.data);
}

export function post<T>(...args: Parameters<typeof api.post>) {
  return api.post<T>(...args).then((res) => res.data);
}

export function put<T>(...args: Parameters<typeof api.put>) {
  return api.put<T>(...args).then((res) => res.data);
}

export function patch<T>(...args: Parameters<typeof api.patch>) {
  return api.patch<T>(...args).then((res) => res.data);
}

export function del<T>(...args: Parameters<typeof api.delete>) {
  return api.delete<T>(...args).then((res) => res.data);
}

// 인터셉터 설정
api.interceptors.request.use(handleCheckAndSetToken);
api.interceptors.response.use((res) => res, handleAPIError);
