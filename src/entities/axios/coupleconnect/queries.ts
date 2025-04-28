import { ConnectCoupleRequest, ConnectCoupleResponse, GenerateCoupleCodeResponse } from "./types";
import { api } from "../instance";

export const coupleConnectQueries = {
  generateCoupleCode: async (): Promise<GenerateCoupleCodeResponse> => {
    const response = await api.post<GenerateCoupleCodeResponse>("/v1/couple/code-generate");
    return response.data;
  },

  connectCouple: async (data: ConnectCoupleRequest): Promise<ConnectCoupleResponse> => {
    const response = await api.post<ConnectCoupleResponse>("/v1/couple/connect", data);
    return response.data;
  },
}; 