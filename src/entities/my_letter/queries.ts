import { useQuery } from "@tanstack/react-query";
import { getLetterListToMe } from "./service";
import { LetterListParams } from "./types";

export const useLetterListToMe = (params: LetterListParams) => {
  return useQuery({
    queryKey: ["letterListToMe", params],
    queryFn: () => getLetterListToMe(params),
  });
}; 