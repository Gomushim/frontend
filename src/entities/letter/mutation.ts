import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLetter, deleteLetter, updateLetter } from "./service";
import { scheduleQueryKey } from "../schedule/queryKey";
import { letterQueryKey } from "./queryKey";

export const useCreateLetterMutation = (scheduleId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => await createLetter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scheduleQueryKey.detail(scheduleId).queryKey,
      });
      queryClient.refetchQueries({
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
      queryClient.refetchQueries({
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

export const useUpdateLetterMutation = (scheduleId: string, letterId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => await updateLetter(data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: letterQueryKey.list().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: letterQueryKey.detail(scheduleId, letterId).queryKey,
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
