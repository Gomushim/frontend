import { api } from "../axios/instance";
import { ScheduleRequst, NewScheduleResponse, ScheduleListResponse } from "./type";

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
