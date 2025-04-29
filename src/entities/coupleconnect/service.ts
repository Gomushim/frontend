import { ConnectCoupleRequest, ConnectCoupleResponse, GenerateCoupleCodeResponse } from "./types";
import { api } from "../axios/instance";

export const coupleConnectQueries = {
  generateCoupleCode: async (): Promise<GenerateCoupleCodeResponse> => {
    const response = await api.post<GenerateCoupleCodeResponse>("/couple/code-generate");
    return response.data;
  },

  connectCouple: async (data: ConnectCoupleRequest): Promise<ConnectCoupleResponse> => {
    const response = await api.post<ConnectCoupleResponse>("/couple/connect", data);
    return response.data;
  },
}; 