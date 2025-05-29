import { useQuery } from "@tanstack/react-query";
import { notificationQueryKey } from "./queryKey";

export const useNotificationQuery = () => {
  return useQuery({
    ...notificationQueryKey.my(),
    refetchInterval: 1000 * 60,
    staleTime: 0,
    gcTime: 0,
  });
};
