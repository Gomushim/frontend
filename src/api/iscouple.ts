import axios from "axios";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

// axios 기본 설정
const api = axios.create({
  baseURL: VITE_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

interface CoupleConnectCheckResponse {
  result: boolean;
}

export const checkCoupleConnect = async (): Promise<CoupleConnectCheckResponse> => {
  try {
    console.log("=== 커플 연결 상태 확인 API 요청 시작 ===");
    const response = await api.get<CoupleConnectCheckResponse>("/v1/couple/check-connect");
    return response.data;
  } catch (error) {
    console.error("=== API 에러 ===");
    if (axios.isAxiosError(error)) {
      console.error("에러 메시지:", error.message);
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log("401,403 에러");
        return { result: false };
      }
    }
    throw error;
  }
};
