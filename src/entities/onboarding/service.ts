import { OnboardingRequest, OnboardingResponse } from "./types";
import { api } from "../axios/instance";

function parseKoreanDateString(dateStr: string): string {
  return dateStr
    .replace("년", "-")
    .replace("월", "-")
    .replace("일", "")
    .replace(/\s/g, "")
    .replace(/-+/g, "-");
}

export const onboardingQueries = {
  postOnboarding: async (data: OnboardingRequest): Promise<OnboardingResponse> => {
    let birthDate = data.birthDate;
    if (birthDate.includes("년")) {
      birthDate = parseKoreanDateString(birthDate);
    }
    const formattedData = {
      ...data,
      birthDate: new Date(birthDate).toISOString().slice(0, 10),
    };
    const response = await api.post<OnboardingResponse>("/member/onboarding", formattedData);
    return response.data;
  },
}; 