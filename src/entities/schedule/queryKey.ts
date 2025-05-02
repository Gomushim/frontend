import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getCalendarSchedule, getScheduleList } from "./service";

export const scheduleQueryKey = createQueryKeys("schedule", {
  calendar: (date: Date) => ({
    queryKey: [date],
    queryFn: () => getCalendarSchedule(date),
  }),
  list: (date: Date) => ({
    queryKey: [date],
    queryFn: () => getScheduleList(date),
  }),
});
