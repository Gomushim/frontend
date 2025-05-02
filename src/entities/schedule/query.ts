import { useSuspenseQuery } from "@tanstack/react-query";
import { scheduleQueryKey } from "./queryKey";

export const useGetCalendarSchedule = (date: Date) => {
  return useSuspenseQuery(scheduleQueryKey.calendar(date));
};

export const useGetScheduleList = (date: Date) => {
  return useSuspenseQuery(scheduleQueryKey.list(date));
};
