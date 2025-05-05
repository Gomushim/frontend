import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getCalendarSchedule, getScheduleDetail, getScheduleList, getWeekSchedule } from "./service";

export const scheduleQueryKey = createQueryKeys("schedule", {
  calendar: (date: Date) => ({
    queryKey: [date.getMonth()],
    queryFn: () => getCalendarSchedule(date),
  }),
  list: (date: Date) => ({
    queryKey: [date.getMonth(), date.getDay()],
    queryFn: () => getScheduleList(date),
  }),
  detail: (scheduleId: string) => ({
    queryKey: [scheduleId],
    queryFn: () => getScheduleDetail(scheduleId),
  }),
  week: () => ({
    queryKey: ["week"],
    queryFn: () => getWeekSchedule(),
  }),
});
