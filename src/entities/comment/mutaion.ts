import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationMethodType } from "../types/mutationMethod.type";
import { createComment } from "./service";
import { CommentRequest } from "./type";
import { letterQueryKey } from "../letter/queryKey";

export const useCommentMutation = (mutationMethod: mutationMethodType, letterId = "", scheduleId = "") => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CommentRequest) => {
      switch (mutationMethod) {
        case "delete":
          return;
        case "post":
          return await createComment(letterId, data);
        case "update":
          return;
        default:
          throw new Error("Invalid mutation method");
      }
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
