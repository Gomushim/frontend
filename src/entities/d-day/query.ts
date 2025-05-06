import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ddayQueryKey } from "./queryKey";
import { getDdayList } from "./service";

export const useGetDdayList = () => {
  return useInfiniteQuery({
    ...ddayQueryKey.list(),
    queryFn: async ({ pageParam = 1 }) => {
      return getDdayList({
        key: pageParam,
        orderCreatedAt: "desc",
        take: 10,
      });
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const { isLastPage, after } = lastPage;
      return isLastPage ? undefined : after;
    },
  });
};

export const useGetMainDdayList = () => {
  return useQuery({ ...ddayQueryKey.main() });
};
