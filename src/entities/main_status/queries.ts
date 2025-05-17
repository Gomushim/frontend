import { useQuery } from "@tanstack/react-query";
import { getCoupleEmotion, getStatusMessage } from "./service";

interface UseEmotionStatusQueriesOptions {
  enabled?: boolean;
}

export const useEmotionStatusQueries = (options?: UseEmotionStatusQueriesOptions) => {
  const getCoupleEmotionQuery = useQuery({
    queryKey: ["coupleEmotion"],
    queryFn: getCoupleEmotion,
    enabled: options?.enabled,
  });

  const getStatusMessageQuery = useQuery({
    queryKey: ["statusMessage"],
    queryFn: getStatusMessage,
    enabled: options?.enabled,
  });

  return {
    getCoupleEmotion: getCoupleEmotionQuery,
    getStatusMessage: getStatusMessageQuery,
  };
}; 