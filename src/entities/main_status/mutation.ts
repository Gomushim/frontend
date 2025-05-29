import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmotionAndStatusMessage } from "./service";
import type { UpdateEmotionAndStatusMessageRequest } from "./types";

export const useCreateEmotionStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateEmotionAndStatusMessageRequest) => {
      return await updateEmotionAndStatusMessage(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupleEmotion"] });
    },
    onError: error => {
      console.error("Error:", error);
    },
  });
};

export const useUpdateEmotionStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateEmotionAndStatusMessageRequest) => {
      return await updateEmotionAndStatusMessage(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupleEmotion"] });
    },
    onError: error => {
      console.error("Error:", error);
    },
  });
};
