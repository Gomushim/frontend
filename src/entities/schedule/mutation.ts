import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchedule } from "./service";
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
        queryKey: scheduleQueryKey.list(endDate).queryKey,
      });
    },
    onError: error => {
      console.error("Error creating schedule:", error);
    },
  });
};

// export const useUpdateScheduleMutation = (data: ScheduleRequst) => {
//   const queryClient = useQueryClient();
//   const { selectedMonth, selectedDay } = useSelectedDateStore();

//   return useMutation({
//     mutationFn: () => updateSchedule(data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: scheduleQueryKey.calendar(selectedMonth).queryKey,
//       });
//       queryClient.invalidateQueries({
//         queryKey: scheduleQueryKey.list(selectedDay).queryKey,
//       });
//     },
//     onError: error => {
//       console.error("Error updating schedule:", error);
//     },
//   });
// };
