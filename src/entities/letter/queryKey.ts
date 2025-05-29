import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getLetterDetail, getLetterListMain } from "./service";

export const letterQueryKey = createQueryKeys("letter", {
  detail: (scheduleId: string, letterId: string) => ({
    queryKey: [scheduleId, letterId],
    queryFn: () => getLetterDetail(scheduleId, letterId),
  }),
  list: () => ({
    queryKey: ["all"],
  }),
  main: () => ({
    queryKey: ["list"],
    queryFn: () => getLetterListMain(),
  }),
});
