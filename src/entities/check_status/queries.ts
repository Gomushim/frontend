import { useQuery } from "@tanstack/react-query";
import { checkStatusQueries } from "./service";

export const useCheckStatus = () => {
  const getMyStatusMessage = useQuery({
    queryKey: ["myStatusMessage"],
    queryFn: () => checkStatusQueries.getMyStatusMessage(),
  });

  const getMyEmotion = useQuery({
    queryKey: ["myEmotion"],
    queryFn: () => checkStatusQueries.getMyEmotion(),
  });

  return {
    getMyStatusMessage,
    getMyEmotion,
  };
}; 