import { useMutation } from "@tanstack/react-query";
import { UpdateEmotionAndStatusMessageRequest } from "./types";
import { emotionStatusQueries } from "./service";

export const useEmotionStatus = () => {
  const updateMyEmotionAndStatusMessage = useMutation({
    mutationFn: (data: UpdateEmotionAndStatusMessageRequest) =>
      emotionStatusQueries.updateMyEmotionAndStatusMessage(data),
    onError: (error) => {
      console.error("상태 메시지 업데이트 API 에러:", error);
    },
  });

  return {
    updateMyEmotionAndStatusMessage,
  };
}; 