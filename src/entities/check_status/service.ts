import { GetMyStatusMessageResponse, GetMyEmotionResponse } from "./types";
import { api } from "../axios/instance";

export const checkStatusQueries = {
  getMyStatusMessage: async (): Promise<GetMyStatusMessageResponse> => {
    const response = await api.get<GetMyStatusMessageResponse>("/member/my-status-message");
    return response.data;
  },

  getMyEmotion: async (): Promise<GetMyEmotionResponse> => {
    const response = await api.get<GetMyEmotionResponse>("/member/my-emotion");
    return response.data;
  },
}; 