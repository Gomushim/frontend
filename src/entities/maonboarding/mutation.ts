import { useMutation } from "@tanstack/react-query";
import { RegisterAnniversaryRequest } from "./types.ts";
import { maonboardingQueries } from "./service.ts";
import { mutationMethodType } from "../types/mutationMethod.type.ts";

export const useMaonboarding = (mutationMethod: mutationMethodType) => {
  return useMutation({
    mutationFn: async (data: RegisterAnniversaryRequest) => {
      switch (mutationMethod) {
        case "delete":
          return;
        case "post":
          return await maonboardingQueries.registerAnniversary(data);
        case "update":
          return;
        default:
          throw new Error("Invalid mutation method");
      }
    },
    onSuccess: () => {},
    onError: error => {
      console.error("기념일 등록 API 에러:", error);
    },
  });
}; 