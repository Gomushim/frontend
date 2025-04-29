import { UpdateEmotionAndStatusMessageRequest, UpdateEmotionAndStatusMessageResponse } from "./types";
import { api } from "../axios/instance";

export const emotionStatusQueries = {
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