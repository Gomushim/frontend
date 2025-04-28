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

interface GetMyStatusMessageResponse {
  result: {
    statusMessage: string;
  };
}

interface GetMyEmotionResponse {
  result: {
    emotion: number;
  };
}

export const getMyStatusMessage = async (): Promise<GetMyStatusMessageResponse> => {
  try {
    console.log("=== 상태 메시지 조회 API 요청 시작 ===");
    const response = await api.get<GetMyStatusMessageResponse>("/v1/member/my-status-message");
    return response.data;
  } catch (error) {
    console.error("=== API 에러 ===");
    if (axios.isAxiosError(error)) {
      console.error("에러 메시지:", error.message);
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log("401,403 에러");
      }
    }
    throw error;
  }
};

export const getMyEmotion = async (): Promise<GetMyEmotionResponse> => {
  try {
    console.log("=== 이모지 조회 API 요청 시작 ===");
    const response = await api.get<GetMyEmotionResponse>("/v1/member/my-emotion");
    return response.data;
  } catch (error) {
    console.error("=== API 에러 ===");
    if (axios.isAxiosError(error)) {
      console.error("에러 메시지:", error.message);
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log("401,403 에러");
      }
    }
    throw error;
  }
};
