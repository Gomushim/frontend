import { GetCoupleStatusMessageResponse, GetCoupleEmotionResponse } from "./types";
import { api } from "../axios/instance";

export const checkStatusQueries = {
  getCoupleStatusMessage: async (): Promise<GetCoupleStatusMessageResponse> => {
    const response = await api.get<GetCoupleStatusMessageResponse>("/couple/status-message");
    return response.data;
  },

  getCoupleEmotion: async (): Promise<GetCoupleEmotionResponse> => {
    const response = await api.get<GetCoupleEmotionResponse>("/couple/emotion");
    return response.data;
  },
}; 