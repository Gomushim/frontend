import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "./service";
import { CommentRequest } from "./type";
import { letterQueryKey } from "../letter/queryKey";

export const useCommentMutation = (letterId = "", scheduleId = "") => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CommentRequest) => {
      return await createComment(letterId, data);
    },
    onSuccess: () => {
      if (scheduleId) {
        queryClient.invalidateQueries({
          queryKey: letterQueryKey.detail(scheduleId, letterId).queryKey,
        });
      }
    },
    onError: error => {
      console.error("Error:", error);
    },
  });
};
