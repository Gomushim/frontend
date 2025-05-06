import { useQuery } from "@tanstack/react-query";
import { coupleNicknameQueries } from "./service";

export const useCoupleNickname = () => {
  const getNickName = useQuery({
    queryKey: ["coupleNickname"],
    queryFn: () => coupleNicknameQueries.getNickName(),
  });

  return {
    getNickName,
  };
}; 