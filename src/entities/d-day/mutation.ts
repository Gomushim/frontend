import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDday, deleteDday, updateDday } from "./service";
import { DdayRequst } from "./model";
import { ddayQueryKey } from "./queryKey";
import { scheduleQueryKey } from "../schedule/queryKey";

export const useCreateDdayMutation = (data: DdayRequst) => {
  const queryClient = useQueryClient();

  if (!data) {
    throw new Error("디데이 생성에 필요한 데이터가 없습니다.");
  }

  const date = new Date(data.date);

  return useMutation({
    mutationFn: () => createDday(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ddayQueryKey.list().queryKey });
      queryClient.invalidateQueries({ queryKey: ddayQueryKey.main().queryKey });
      queryClient.invalidateQueries({ queryKey: scheduleQueryKey.week().queryKey });
      queryClient.invalidateQueries({ queryKey: scheduleQueryKey.list(date).queryKey });
      queryClient.invalidateQueries({ queryKey: scheduleQueryKey.calendar(date).queryKey });
    },
    onError: error => {
      console.error("Error:", error);
    },
  });
};

export const useUpdateDdayMutation = (data: DdayRequst) => {
  const queryClient = useQueryClient();

  if (!data) {
    throw new Error("디데이 수정에 필요한 데이터가 없습니다.");
  }

  const date = new Date(data.date);

  return useMutation({
    mutationFn: () => updateDday(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ddayQueryKey.list().queryKey });
      queryClient.invalidateQueries({ queryKey: ddayQueryKey.main().queryKey });
      queryClient.invalidateQueries({ queryKey: scheduleQueryKey.week().queryKey });
      queryClient.invalidateQueries({ queryKey: scheduleQueryKey.list(date).queryKey });
      queryClient.invalidateQueries({ queryKey: scheduleQueryKey.calendar(date).queryKey });
    },
    onError: error => {
      console.error("Error:", error);
    },
  });
};

export const useDeleteDdayMutation = (ddayId: string, date: string) => {
  const queryClient = useQueryClient();

  if (!ddayId) {
    throw new Error("디데이 삭제에 필요한 ID가 없습니다.");
  }

  const newDate = new Date(date);

  return useMutation({
    mutationFn: () => deleteDday(ddayId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ddayQueryKey.list().queryKey });
      queryClient.invalidateQueries({ queryKey: ddayQueryKey.main().queryKey });
      queryClient.invalidateQueries({ queryKey: scheduleQueryKey.week().queryKey });
      queryClient.invalidateQueries({ queryKey: scheduleQueryKey.list(newDate).queryKey });
      queryClient.invalidateQueries({ queryKey: scheduleQueryKey.calendar(newDate).queryKey });
    },
    onError: error => {
      console.error("Error:", error);
    },
  });
};
