import { GetCoupleEmotionResponse, GetStatusMessageResponse, UpdateEmotionAndStatusMessageRequest, UpdateEmotionAndStatusMessageResponse } from "./types";
import { api } from "../axios/instance";

export const getCoupleEmotion = () => {
  return api.get<GetCoupleEmotionResponse>("/couple/emotion");
};

export const getStatusMessage = () => {
  return api.get<GetStatusMessageResponse>("/couple/status-message");
};

export const updateEmotionAndStatusMessage = (data: UpdateEmotionAndStatusMessageRequest) => {
  return api.post<UpdateEmotionAndStatusMessageResponse>("/member/my-emotion-and-status-message", data);
}; 