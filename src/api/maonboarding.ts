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

interface RegisterAnniversaryRequest {
  coupleId: number;
  relationshipStartDate: string;
  militaryStartDate: string;
  militaryEndDate: string;
  military: "ARMY" | "NAVY" | "AIR_FORCE" | "MARINE";
}

interface RegisterAnniversaryResponse {
  result: boolean;
}

export const registerAnniversary = async (data: RegisterAnniversaryRequest): Promise<RegisterAnniversaryResponse> => {
  try {
    const response = await api.post<RegisterAnniversaryResponse>("/v1/couple/anniversary", data);
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
