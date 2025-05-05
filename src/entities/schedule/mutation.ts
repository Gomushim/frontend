import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchedule } from "./service";
import { ScheduleRequst } from "./type";
import { mutationMethodType } from "../types/mutationMethod.type";
import { scheduleQueryKey } from "./queryKey";
import { useSelectedDateStore } from "./store";

export const useScheduleMutation = (data: ScheduleRequst, mutationMethod: mutationMethodType) => {
  const queryClient = useQueryClient();
  const { selectedMonth, selectedDay } = useSelectedDateStore();

  return useMutation({
    mutationFn: async () => {
      switch (mutationMethod) {
        case "delete":
          return await createSchedule(data);
        case "post":
          return await createSchedule(data);
        case "update":
          return await createSchedule(data);
        default:
          throw new Error("Invalid mutation method");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.calendar(selectedMonth).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.list(selectedDay).queryKey,
      });
    },
    onError: error => {
      console.error("Error:", error);
    },
  });
};
