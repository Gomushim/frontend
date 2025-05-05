import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDday } from "./service";
import { DdayRequst } from "./type";
import { mutationMethodType } from "../types/mutationMethod.type";
import { ddayQueryKey } from "./queryKey";
import { scheduleQueryKey } from "../schedule/queryKey";
import { useDdayStore } from "./store";

export const useDdayMutation = (mutationMethod: mutationMethodType) => {
  const { dday } = useDdayStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DdayRequst) => {
      switch (mutationMethod) {
        case "delete":
          return;
        case "post":
          return await createDday(data);
        case "update":
          return;
        default:
          throw new Error("Invalid mutation method");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ddayQueryKey.list().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: ddayQueryKey.main().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.week().queryKey,
      });

      const date = new Date(dday.date);
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.list(date).queryKey,
      });
    },
    onError: error => {
      console.error("Error:", error);
    },
  });
};
