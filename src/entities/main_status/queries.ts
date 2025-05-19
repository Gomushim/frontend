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
    refetchInterval: 1000 * 60,
    staleTime: 0,
    gcTime: 0,
  });

  const getStatusMessageQuery = useQuery({
    queryKey: ["statusMessage"],
    queryFn: getStatusMessage,
    enabled: options?.enabled,
    refetchInterval: 1000 * 60,
    staleTime: 0,
    gcTime: 0,
  });

  return {
    getCoupleEmotion: getCoupleEmotionQuery,
    getStatusMessage: getStatusMessageQuery,
  };
}; 