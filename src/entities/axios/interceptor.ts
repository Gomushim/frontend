import { HTTP_STATUS_CODE } from "../../shared/constants/api";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { api } from "./instance";

/**
 * 요청 인터셉터 - Access Token을 헤더에 추가
 */

export const handleCheckAndSetToken = (config: InternalAxiosRequestConfig) => {
  return config;
};

/**
 * 응답 인터셉터 - 401 발생 시 Refresh Token을 사용하여 기존 요청 재시도
 */
export const handleAPIError = async (error: AxiosError) => {
  if (!error.response) {
    return Promise.reject(new Error("서버 응답이 없습니다. 네트워크 상태를 확인해주세요."));
  }

  const { response, config } = error;
  const { status } = response;

  // 무한루프 방지: 재발급 시도 여부 플래그
  if ((config as any)?._retry) {
    window.location.href = "/login";
    return Promise.reject(error);
  }

  if (status === HTTP_STATUS_CODE.UNAUTHORIZED) {
    try {
      // 토큰 재발급 요청
      const reissueRes = await api.post("/auth/reissue");
      // result가 true이거나, 서버에서 200 OK로 응답하면 성공으로 간주
      if (reissueRes && (reissueRes.status === 200 || (reissueRes.data && reissueRes.data.result === true))) {
        if (config) {
          (config as any)._retry = true; // 재발급 시도 플래그
          return api.request(config as any);
        } else {
          return Promise.reject(error);
        }
      } else {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    } catch (e) {
      console.log("reissue error:", e);
      window.location.href = "/login";
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
};
