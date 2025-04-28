import { CoupleConnectCheckResponse } from "./types";
import { api } from "../instance";

export const iscoupleQueries = {
  checkCoupleConnect: async (): Promise<CoupleConnectCheckResponse> => {
    const response = await api.get<CoupleConnectCheckResponse>("/v1/couple/check-connect");
    return response.data;
  },
}; 