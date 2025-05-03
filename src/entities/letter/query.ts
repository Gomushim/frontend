import { useQuery } from "@tanstack/react-query";
import { letterQueryKey } from "./queryKey";

export const useGetLetterDetail = (scheduleId: string, letterId: string) => {
  return useQuery(letterQueryKey.detail(scheduleId, letterId));
};
