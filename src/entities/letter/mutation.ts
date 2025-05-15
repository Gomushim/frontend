import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLetter, deleteLetter, updateLetter } from "./service";
import { scheduleQueryKey } from "../schedule/queryKey";
import { letterQueryKey } from "./queryKey";
import { UpdateLetterRequest } from "./type";

export const useCreateLetterMutation = (scheduleId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => await createLetter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.detail(scheduleId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: letterQueryKey.list().queryKey,
      });
    },
    onError: error => {
      console.error("Error:", error);
    },
  });
};

export const useDeleteLetterMutation = (scheduleId: string, letterId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await deleteLetter(scheduleId, letterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: letterQueryKey.list().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.detail(scheduleId).queryKey,
      });
    },
    onError: error => {
      console.error("Error:", error);
    },
  });
};

export const useUpdateLetterMutation = (scheduleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateLetterRequest) => await updateLetter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: letterQueryKey.list().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.detail(scheduleId).queryKey,
      });
    },
    onError: error => {
      console.error("Error:", error);
    },
  });
};
