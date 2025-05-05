import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyNotification, updateMyNotification } from "./service";
import type { UpdateNotificationRequest } from "./types";
import { mutationMethodType } from "../types/mutationMethod.type";

export const useNotificationQuery = (mutationMethod?: mutationMethodType) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["myNotification"],
    queryFn: getMyNotification,
  });

  const mutation = useMutation({
    mutationFn: async (data: UpdateNotificationRequest) => {
      switch (mutationMethod) {
        case "get":
          return await getMyNotification();
        case "post":
          return await updateMyNotification(data);
        case "delete":
          return;
        case "update":
          return;
        default:
          throw new Error("Invalid mutation method");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myNotification"] });
    },
  });

  return { query, mutation };
}; 