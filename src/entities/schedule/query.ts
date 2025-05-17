import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { scheduleQueryKey } from "./queryKey";

export const useGetCalendarSchedule = (date: Date) => {
  return useSuspenseQuery(scheduleQueryKey.calendar(date));
};

export const useGetScheduleList = (date: Date | null) => {
  return useSuspenseQuery(scheduleQueryKey.list(date || new Date()));
};

export const useGetScheduleDetail = (scheduleId: string) => {
  return useQuery(scheduleQueryKey.detail(scheduleId));
};

export const useGetWeekSchedule = () => {
  return useSuspenseQuery({ ...scheduleQueryKey.week() });
};
