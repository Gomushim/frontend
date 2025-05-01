import { UpdateEmotionAndStatusMessageRequest, UpdateEmotionAndStatusMessageResponse, GetCoupleEmotionResponse } from "./types";
import { api } from "../axios/instance";

export const emotionStatusQueries = {
  getCoupleEmotion: async (): Promise<GetCoupleEmotionResponse> => {
    const response = await api.get<GetCoupleEmotionResponse>("/couple/emotion");
    return response.data;
  },

  updateMyEmotionAndStatusMessage: async (
    data: UpdateEmotionAndStatusMessageRequest
  ): Promise<UpdateEmotionAndStatusMessageResponse> => {
    const response = await api.post<UpdateEmotionAndStatusMessageResponse>(
      "/member/my-emotion-and-status-message",
      data
    );
    return response.data;
  },
}; 