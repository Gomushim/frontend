import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { emotionStatusQueries } from "./service";
import { UpdateEmotionAndStatusMessageRequest } from "./types";

export const useEmotionStatus = () => {
  const queryClient = useQueryClient();

  const getCoupleEmotion = useQuery({
    queryKey: ["coupleEmotion"],
    queryFn: emotionStatusQueries.getCoupleEmotion,
  });

  const updateMyEmotionAndStatusMessage = useMutation({
    mutationFn: (data: UpdateEmotionAndStatusMessageRequest) =>
      emotionStatusQueries.updateMyEmotionAndStatusMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupleEmotion"] });
    },
  });

  return {
    getCoupleEmotion,
    updateMyEmotionAndStatusMessage,
  };
}; 