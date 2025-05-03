import { useQuery } from "@tanstack/react-query";
import { getLetterListMain } from "./service";

export const letterKeys = {
  all: ["letters"] as const,
  lists: () => [...letterKeys.all, "list"] as const,
  main: () => [...letterKeys.lists(), "main"] as const,
};

export const useGetLetterListMain = () => {
  return useQuery({
    queryKey: letterKeys.main(),
    queryFn: getLetterListMain,
  });
}; 