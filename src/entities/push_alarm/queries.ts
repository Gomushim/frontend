import { useQuery } from "@tanstack/react-query";
import { getMyNotification } from "./service";

export const useNotificationQuery = () => {
  return useQuery({
    queryKey: ["myNotification"],
    queryFn: getMyNotification,
  });
}; 