import { api } from "../axios/instance";
import { MyEmotionResponse, MyStatusMessageResponse, MyInfoResponse } from "./types";

export const getMyEmotion = async (): Promise<MyEmotionResponse> => {
  const { data } = await api.get<MyEmotionResponse>("/member/my-emotion");
  return data;
};

export const getMyStatusMessage = async (): Promise<MyStatusMessageResponse> => {
  const { data } = await api.get<MyStatusMessageResponse>("/member/my-status-message");
  return data;
};

export const getMyInfo = async (): Promise<MyInfoResponse> => {
  const { data } = await api.get<MyInfoResponse>("/member/my-info");
  return data;
}; 