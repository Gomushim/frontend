import { useMutation } from "@tanstack/react-query";
import { OnboardingRequest } from "./types";
import { onboardingQueries } from "./service";

export const useOnboarding = () => {
  const postOnboarding = useMutation({
    mutationFn: (data: OnboardingRequest) => onboardingQueries.postOnboarding(data),
    onError: (error) => {
      console.error("온보딩 API 에러:", error);
    },
  });

  return {
    postOnboarding,
  };
}; 