import { NotificationResponse, UpdateNotificationRequest, UpdateNotificationResponse } from "./types";
import { api } from "../axios/instance";

export const getMyNotification = async (): Promise<NotificationResponse> => {
  const response = await api.get("/member/my-notification");
  return response.data;
};

export const updateMyNotification = async (
  data: UpdateNotificationRequest
): Promise<UpdateNotificationResponse> => {
  const response = await api.post("/member/my-notification", data);
  return response.data;
}; 