import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmotionAndStatusMessage } from "./service";
import { UpdateEmotionAndStatusMessageRequest } from "./types";
import { mutationMethodType } from "../types/mutationMethod.type";

export const useEmotionStatusMutation = (mutationMethod: mutationMethodType) => {
  const queryClient = useQueryClient();

  const updateMyEmotionAndStatusMessage = useMutation({
    mutationFn: async (data: UpdateEmotionAndStatusMessageRequest) => {
      switch (mutationMethod) {
        case "delete":
          return;
        case "post":
          return await updateEmotionAndStatusMessage(data);
        case "update":
          return await updateEmotionAndStatusMessage(data);
        default:
          throw new Error("Invalid mutation method");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupleEmotion"] });
    },
    onError: error => {
      console.error("Error:", error);
    },
  });

  return {
    updateMyEmotionAndStatusMessage,
  };
}; 