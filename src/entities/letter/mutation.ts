import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationMethodType } from "../types/mutationMethod.type";
import { createLetter } from "./service";
import { scheduleQueryKey } from "../schedule/queryKey";

export const useLetterMutation = (mutationMethod: mutationMethodType, scheduleId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      switch (mutationMethod) {
        case "delete":
          return;
        case "post":
          return await createLetter(data);
        case "update":
          return;
        default:
          throw new Error("Invalid mutation method");
      }
    },
    onSuccess: () => {
      if (scheduleId) {
        queryClient.invalidateQueries({
          queryKey: scheduleQueryKey.detail(scheduleId).queryKey,
        });
      }
    },
    onError: error => {
      console.error("Error:", error);
    },
  });
};
