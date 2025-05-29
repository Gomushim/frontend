import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ConnectCoupleRequest } from "./types";
import { coupleConnectQueries } from "./service";

export const useGenerateCoupleCode = () => {
  return useMutation({
    mutationFn: async () => {
      return await coupleConnectQueries.generateCoupleCode();
    },
    onError: error => {
      console.error("커플 코드 생성 API 에러:", error);
    },
  });
};

export const useConnectCouple = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ConnectCoupleRequest) => {
      return await coupleConnectQueries.connectCouple(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCoupleInfo"],
      });
    },
    onError: error => {
      console.error("커플 연결 API 에러:", error);
    },
  });
};
