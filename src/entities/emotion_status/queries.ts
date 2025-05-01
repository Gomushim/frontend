import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCoupleEmotion, getStatusMessage, updateEmotionAndStatusMessage } from "./service";
import { UpdateEmotionAndStatusMessageRequest } from "./types";

export const useEmotionStatus = () => {
  const queryClient = useQueryClient();

  const getCoupleEmotionQuery = useQuery({
    queryKey: ["coupleEmotion"],
    queryFn: getCoupleEmotion,
  });

  const getStatusMessageQuery = useQuery({
    queryKey: ["statusMessage"],
    queryFn: getStatusMessage,
  });

  const updateMyEmotionAndStatusMessage = useMutation({
    mutationFn: (data: UpdateEmotionAndStatusMessageRequest) =>
      updateEmotionAndStatusMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupleEmotion"] });
    },
  });

  return {
    getCoupleEmotion: getCoupleEmotionQuery,
    getStatusMessage: getStatusMessageQuery,
    updateMyEmotionAndStatusMessage,
  };
}; 