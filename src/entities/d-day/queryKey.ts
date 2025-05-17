import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getMainDdayList } from "./service";

export const ddayQueryKey = createQueryKeys("dday", {
  list: () => ({
    queryKey: ["all"],
  }),
  main: () => ({
    queryKey: ["top3"],
    queryFn: () => getMainDdayList(),
  }),
});
