import { OnboardingRequest, OnboardingResponse } from "./types";
import { api } from "../axios/instance";
import { formatDateKorean } from "@/shared/utils/date/formatdate";

export const onboardingQueries = {
  postOnboarding: async (data: OnboardingRequest): Promise<OnboardingResponse> => {
    const formattedData = {
      ...data,
      birthDate: formatDateKorean(new Date(data.birthDate)),
    };
    
    const response = await api.post<OnboardingResponse>("/member/onboarding", formattedData);
    return response.data;
  },
}; 