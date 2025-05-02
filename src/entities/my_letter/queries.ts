import { useQuery } from "@tanstack/react-query";
import { getLetterListToMe } from "./service";
import { GetLetterListToMeParams } from "./types";

export const letterKeys = {
  all: ["letters"] as const,
  lists: () => [...letterKeys.all, "list"] as const,
  list: (params: GetLetterListToMeParams) => [...letterKeys.lists(), params] as const,
};

export const useGetLetterListToMe = (params?: GetLetterListToMeParams) => {
  return useQuery({
    queryKey: letterKeys.list(params || {}),
    queryFn: () => getLetterListToMe(params),
  });
}; 