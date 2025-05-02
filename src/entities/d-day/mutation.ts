import { useMutation } from "@tanstack/react-query";
import { createDday } from "./service";
import { DdayRequst } from "./type";
import { mutationMethodType } from "../types/mutationMethod.type";

export const useDdayMutation = (mutationMethod: mutationMethodType) => {
  return useMutation({
    mutationFn: async (data: DdayRequst) => {
      switch (mutationMethod) {
        case "delete":
          return;
        case "post":
          return await createDday(data);
        case "update":
          return;
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
