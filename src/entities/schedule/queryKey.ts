import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getCalendarSchedule } from "./service";

export const novelQueryKey = createQueryKeys("schedule", {
  calendar: (date: Date) => ({
    queryKey: [date],
    queryFn: () => getCalendarSchedule(date),
  }),
});
