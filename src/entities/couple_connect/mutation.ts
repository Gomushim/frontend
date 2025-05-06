import { useMutation } from "@tanstack/react-query";
import { ConnectCoupleRequest } from "./types";
import { coupleConnectQueries } from "./service";
import { mutationMethodType } from "../types/mutationMethod.type";

export const useCoupleConnect = (mutationMethod: mutationMethodType) => {
  return useMutation({
    mutationFn: async (data?: ConnectCoupleRequest) => {
      switch (mutationMethod) {
        case "post":
          return await coupleConnectQueries.generateCoupleCode();
        case "update":
          if (!data) throw new Error("커플 연결을 위한 데이터가 필요합니다.");
          return await coupleConnectQueries.connectCouple(data);
        case "delete":
          return;
        default:
          throw new Error("Invalid mutation method");
      }
    },
    onError: (error) => {
      console.error("커플 연결 API 에러:", error);
    },
  });
}; 