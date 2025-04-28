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

interface UpdateEmotionAndStatusMessageRequest {
  emotion: number;
  statusMessage: string;
}

interface UpdateEmotionAndStatusMessageResponse {
  result: boolean;
}

export const updateMyEmotionAndStatusMessage = async (
  data: UpdateEmotionAndStatusMessageRequest
): Promise<UpdateEmotionAndStatusMessageResponse> => {
  try {
    console.log("=== 상태 메시지 업데이트 API 요청 시작 ===");
    const response = await api.post<UpdateEmotionAndStatusMessageResponse>(
      "/v1/member/my-emotion-and-status-message",
      data
    );
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
