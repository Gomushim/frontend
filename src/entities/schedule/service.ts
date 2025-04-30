import { api } from "../axios/instance";
import { ScheduleRequst, NewScheduleResponse } from "./type";

export const createSchedule = async (data: ScheduleRequst): Promise<NewScheduleResponse> => {
  const response = await api.post<NewScheduleResponse>("/schedules", data);
  return response.data;
};
