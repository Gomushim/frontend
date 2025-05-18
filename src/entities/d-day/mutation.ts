import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDday, updateDday } from "./service";
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
    },
    onError: error => {
      console.error("Error:", error);
    },
  });
};

export const useUpdateDdayMutation = (data: DdayRequst) => {
  const queryClient = useQueryClient();
  console.log("data", data);

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
    },
    onError: error => {
      console.error("Error:", error);
    },
  });
};
