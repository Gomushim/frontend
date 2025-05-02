import { useMutation } from "@tanstack/react-query";
import { mutationMethodType } from "../types/mutationMethod.type";
import { createLetter } from "./service";

export const useLetterMutation = (data: FormData, mutationMethod: mutationMethodType) => {
  return useMutation({
    mutationFn: async () => {
      switch (mutationMethod) {
        case "delete":
          return await createLetter(data);
        case "post":
          return await createLetter(data);
        case "update":
          return await createLetter(data);
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
