import { api } from "../axios/instance";
import { ScheduleRequst, NewScheduleResponse, ScheduleListResponse, ScheduleDetailResponse } from "./type";

export const createSchedule = async (data: ScheduleRequst): Promise<NewScheduleResponse> => {
  const response = await api.post<NewScheduleResponse>("/schedules", data);
  return response.data;
};

export const getCalendarSchedule = async (date: Date): Promise<ScheduleListResponse> => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const response = await api.get<ScheduleListResponse>(`/schedules?year=${year}&month=${month}`);
  return response.data;
};

export const getScheduleList = async (date: Date): Promise<ScheduleListResponse> => {
  const formattedDate = date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, "-")
    .replace(".", "");

  const response = await api.get<ScheduleListResponse>(`/schedules/date?date=${formattedDate}`);
  return response.data;
};

export const getScheduleDetail = async (scheduleId: string): Promise<ScheduleDetailResponse> => {
  const response = await api.get<ScheduleDetailResponse>(`/schedules/detail/${scheduleId}`);
  return response.data;
};

export const getWeekSchedule = async (): Promise<ScheduleListResponse> => {
  const response = await api.get<ScheduleListResponse>("/schedules/week");
  return response.data;
};
