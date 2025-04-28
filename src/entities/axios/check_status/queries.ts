import { GetMyStatusMessageResponse, GetMyEmotionResponse } from "./types";
import { api } from "../instance";

export const checkStatusQueries = {
  getMyStatusMessage: async (): Promise<GetMyStatusMessageResponse> => {
    const response = await api.get<GetMyStatusMessageResponse>("/v1/member/my-status-message");
    return response.data;
  },

  getMyEmotion: async (): Promise<GetMyEmotionResponse> => {
    const response = await api.get<GetMyEmotionResponse>("/v1/member/my-emotion");
    return response.data;
  },
}; 