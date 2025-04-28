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

interface OnboardingRequest {
  nickname: string;
  birthDate: string;
  fcmToken: string;
  isNotification: boolean;
}

// 날짜 형식을 "YYYY-MM-DD" 형식으로 변환하는 함수
const formatDate = (dateString: string) => {
  const match = dateString.match(/(\d{4})년\s(\d{2})월\s(\d{2})일/);
  if (match) {
    const [_, year, month, day] = match;
    return `${year}-${month}-${day}`;
  }
  return dateString;
};

export const postOnboarding = async (data: OnboardingRequest) => {
  try {
    const formattedData = {
      ...data,
      birthDate: formatDate(data.birthDate),
    };

    console.log("=== API 요청 시작 ===");
    const response = await api.post("/v1/member/onboarding", formattedData);
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
