import { useQuery } from "@tanstack/react-query";
import { novelQueryKey } from "./queryKey";

export const useGetCalendarSchedule = (date: Date) => {
  return useQuery(novelQueryKey.calendar(date));
};
