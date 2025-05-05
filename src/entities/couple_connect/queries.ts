import { useMutation } from "@tanstack/react-query";
import { ConnectCoupleRequest } from "./types";
import { coupleConnectQueries } from "./service";

export const useCoupleConnect = () => {
  const generateCoupleCode = useMutation({
    mutationFn: () => coupleConnectQueries.generateCoupleCode(),
    onError: (error) => {
      console.error("커플 코드 생성 API 에러:", error);
    },
  });

  const connectCouple = useMutation({
    mutationFn: (data: ConnectCoupleRequest) => coupleConnectQueries.connectCouple(data),
    onError: (error) => {
      console.error("커플 연결 API 에러:", error);
    },
  });

  return {
    generateCoupleCode,
    connectCouple,
  };
}; 