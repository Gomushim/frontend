import { useQuery } from "@tanstack/react-query";
import { getLetterListMain } from "./service";

export const letterKeys = {
  all: ["letters"] as const,
  lists: () => [...letterKeys.all, "list"] as const,
  main: () => [...letterKeys.lists(), "main"] as const,
};

export const useGetLetterListMain = (enabled: boolean) => {
  return useQuery({
    queryKey: letterKeys.main(),
    queryFn: getLetterListMain,
    enabled: enabled,
    staleTime: 0,
    gcTime: 0,
  });
};
