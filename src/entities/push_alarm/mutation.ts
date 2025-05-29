import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyNotification } from "./service";
import type { UpdateNotificationRequest } from "./types";

export const useNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateNotificationRequest) => {
      return await updateMyNotification(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myNotification"] });
    },
  });
};
