import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { letterQueryKey } from "./queryKey";
import { getLetterList } from "./service";

export const useGetLetterDetail = (scheduleId: string, letterId: string) => {
  return useQuery({ ...letterQueryKey.detail(scheduleId, letterId) });
};

export const useGetLetterList = () => {
  return useInfiniteQuery({
    ...letterQueryKey.list(),
    queryFn: async ({ pageParam = 1 }) => {
      return getLetterList({
        page: pageParam,
        size: 10,
      });
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const { isLastPage, after } = lastPage;
      return isLastPage ? undefined : after;
    },
  });
};
