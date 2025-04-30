import { useMutation } from "@tanstack/react-query";
import { createDday } from "./service";
import { DdayRequst } from "./type";

type mutationMethodType = "post" | "delete" | "update";

export const useNovelMutation = (data: DdayRequst, mutationMethod: mutationMethodType) => {
  return useMutation({
    mutationFn: async () => {
      switch (mutationMethod) {
        case "delete":
          return await createDday(data);
        case "post":
          return await createDday(data);
        case "update":
          return await createDday(data);
        default:
          throw new Error("Invalid mutation method");
      }
    },
    onSuccess: () => {},
    onError: error => {
      console.error("Error:", error);
    },
  });
};
