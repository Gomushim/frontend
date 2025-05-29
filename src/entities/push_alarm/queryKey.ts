import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getMyNotification } from "./service";

export const notificationQueryKey = createQueryKeys("notification", {
  my: () => ({
    queryKey: ["myNotification"],
    queryFn: () => getMyNotification(),
  }),
});
