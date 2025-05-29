import { useMutation } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: async (data: ConnectCoupleRequest) => {
      return await coupleConnectQueries.connectCouple(data);
    },

    onError: error => {
      console.error("커플 연결 API 에러:", error);
    },
  });
};
