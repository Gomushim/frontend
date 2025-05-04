import { createQueryKeys } from "@lukemorales/query-key-factory";

export const ddayQueryKey = createQueryKeys("dday", {
  list: () => ({
    queryKey: ["all"],
  }),
});
