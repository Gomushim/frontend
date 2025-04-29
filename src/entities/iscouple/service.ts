import { CoupleConnectCheckResponse } from "./types";
import { api } from "../axios/instance";

export const iscoupleQueries = {
  checkCoupleConnect: async (): Promise<CoupleConnectCheckResponse> => {
    const response = await api.get<CoupleConnectCheckResponse>("/couple/check-connect");
    return response.data;
  },
}; 