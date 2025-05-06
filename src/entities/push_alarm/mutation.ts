import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyNotification } from "./service";
import type { UpdateNotificationRequest } from "./types";
import { mutationMethodType } from "../types/mutationMethod.type";

export const useNotificationMutation = (mutationMethod?: mutationMethodType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateNotificationRequest) => {
      switch (mutationMethod) {
        case "post":
          return await updateMyNotification(data);
        case "delete":
          return;
        case "update":
          return;
        default:
          throw new Error("Invalid mutation method");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myNotification"] });
    },
  });
}; 