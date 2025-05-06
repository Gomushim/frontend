import { useQuery } from "@tanstack/react-query";
import { getCoupleEmotion, getStatusMessage } from "./service";

export const useEmotionStatusQueries = () => {
  const getCoupleEmotionQuery = useQuery({
    queryKey: ["coupleEmotion"],
    queryFn: getCoupleEmotion,
  });

  const getStatusMessageQuery = useQuery({
    queryKey: ["statusMessage"],
    queryFn: getStatusMessage,
  });

  return {
    getCoupleEmotion: getCoupleEmotionQuery,
    getStatusMessage: getStatusMessageQuery,
  };
}; 