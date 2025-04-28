import axios from "axios";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: VITE_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

interface DdayResponse {
  result: {
    sinceLove: number;
    sinceMilitaryStart: number;
    militaryEndLeft: number;
  };
}

export const getDday = async (): Promise<DdayResponse> => {
  try {
    const response = await api.get<DdayResponse>("/v1/couple/d-day");
    return response.data;
  } catch (error) {
    console.error("=== API 에러 ===");
    if (axios.isAxiosError(error)) {
      console.error("에러 메시지:", error.message);
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error("인증에 실패했습니다.");
      }
    }
    throw error;
  }
};
