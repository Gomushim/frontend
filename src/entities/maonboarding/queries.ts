import { useMutation } from "@tanstack/react-query";
import { RegisterAnniversaryRequest } from "./types";
import { maonboardingQueries } from "./service";

export const useMaonboarding = () => {
  const registerAnniversary = useMutation({
    mutationFn: (data: RegisterAnniversaryRequest) => maonboardingQueries.registerAnniversary(data),
    onError: (error) => {
      console.error("기념일 등록 API 에러:", error);
    },
  });

  return {
    registerAnniversary,
  };
}; 