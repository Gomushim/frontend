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

export const generateCoupleCode = async () => {
  try {
    console.log("=== 커플 코드 생성 API 요청 시작 ===");
    const response = await api.post("/v1/couple/code-generate");
    return response.data;
  } catch (error) {
    console.error("=== API 에러 ===");
    if (axios.isAxiosError(error)) {
      console.error("에러 메시지:", error.message);
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log("401,403 에러");
        return;
      }
    }
    throw error;
  }
};

interface ConnectCoupleRequest {
  coupleCode: string;
}

interface ConnectCoupleResponse {
  result: {
    id: number;
    invitorId: number;
    inviteeId: number;
    relationshipStartDate: string;
    militaryStartDate: string;
    militaryEndDate: string;
    military: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
  };
}

export const connectCouple = async (data: ConnectCoupleRequest): Promise<ConnectCoupleResponse> => {
  try {
    console.log("=== 커플 연결 API 요청 시작 ===");
    const response = await api.post<ConnectCoupleResponse>("/v1/couple/connect", data);
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
