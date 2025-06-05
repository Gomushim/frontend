import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterAnniversaryRequest } from "./types.ts";
import { initSettingQueries } from "./service.ts";

export const useInitSettingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RegisterAnniversaryRequest) => {
      return await initSettingQueries.registerAnniversary(data);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["getCoupleInfo"],
      });
      queryClient.refetchQueries({
        queryKey: ["dday"],
      });
    },
    onError: error => {
      console.error("기념일 등록 API 에러:", error);
    },
  });
};
