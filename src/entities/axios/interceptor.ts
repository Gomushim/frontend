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

  if (status === HTTP_STATUS_CODE.UNAUTHORIZED) {
    try {
      // 토큰 재발급 요청
      const reissueRes = await api.post("/auth/reissue");
      console.log("reissue response:", reissueRes);
      if (reissueRes && typeof reissueRes === "object" && (reissueRes as any).result === true) {
        // 재발급 성공: 원래 요청 재시도
        if (config) {
          console.log("retrying original request with config:", config);
          return api.request(config as any);
        } else {
          return Promise.reject(error);
        }
      } else {
        // 재발급 실패: 로그인 페이지로 이동

        return Promise.reject(error);
      }
    } catch (e) {
      // 재발급 요청 자체가 실패
      console.log("reissue error:", e);
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
};
