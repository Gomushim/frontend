import { HTTP_STATUS_CODE } from "../../shared/constants/api";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

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

  const { response } = error;
  const { status } = response;

  if (status === HTTP_STATUS_CODE.UNAUTHORIZED) {
    window.location.href = "/login";
    return Promise.reject(error);
  }

  return Promise.reject(error);
};
