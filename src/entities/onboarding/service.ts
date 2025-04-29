import { OnboardingRequest, OnboardingResponse } from "./types";
import { api } from "../axios/instance";

// 날짜 형식을 "YYYY-MM-DD" 형식으로 변환하는 함수
const formatDate = (dateString: string) => {
  const match = dateString.match(/(\d{4})년\s(\d{2})월\s(\d{2})일/);
  if (match) {
    const [_, year, month, day] = match;
    return `${year}-${month}-${day}`;
  }
  return dateString;
};

export const onboardingQueries = {
  postOnboarding: async (data: OnboardingRequest): Promise<OnboardingResponse> => {
    const formattedData = {
      ...data,
      birthDate: formatDate(data.birthDate),
    };
    
    const response = await api.post<OnboardingResponse>("/member/onboarding", formattedData);
    return response.data;
  },
}; 