import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ddayQueryKey } from "./queryKey";
import { getDdayList } from "./service";

export const useGetDdayList = () => {
  return useInfiniteQuery({
    queryKey: ddayQueryKey.list().queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      return getDdayList({
        page: pageParam,
        size: 10,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.isLastPage) return undefined;
      return allPages.length + 1;
    },
  });
};

export const useGetMainDdayList = (enabled: boolean) => {
  return useQuery({ ...ddayQueryKey.main(), enabled: enabled });
};
