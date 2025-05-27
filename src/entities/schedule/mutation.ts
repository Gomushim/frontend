import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchedule, deleteSchedule, updateSchedule } from "./service";
import { ScheduleRequst } from "./type";
import { scheduleQueryKey } from "./queryKey";

// 일정 생성 훅
export const useCreateScheduleMutation = (data: ScheduleRequst) => {
  const queryClient = useQueryClient();

  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  return useMutation({
    mutationFn: () => createSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.calendar(startDate).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.list(startDate).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.list(endDate).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.week().queryKey,
      });
    },
    onError: error => {
      console.error("Error creating schedule:", error);
    },
  });
};

export const useDeleteScheduleMutation = (scheduleId: string, data: ScheduleRequst) => {
  const queryClient = useQueryClient();

  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  return useMutation({
    mutationFn: () => deleteSchedule(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.calendar(startDate).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.list(startDate).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.list(endDate).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.week().queryKey,
      });
    },
    onError: error => {
      console.error("Error creating schedule:", error);
    },
  });
};

export const useUpdateScheduleMutation = (data: ScheduleRequst) => {
  const queryClient = useQueryClient();

  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  return useMutation({
    mutationFn: () => updateSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.calendar(startDate).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.list(startDate).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.list(endDate).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.week().queryKey,
      });
    },
    onError: error => {
      console.error("Error updating schedule:", error);
    },
  });
};
