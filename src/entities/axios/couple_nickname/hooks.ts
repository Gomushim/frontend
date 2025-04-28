import { useQuery } from "@tanstack/react-query";
import { coupleNicknameQueries } from "./queries";

export const useCoupleNickname = () => {
  const getNickName = useQuery({
    queryKey: ["coupleNickname"],
    queryFn: () => coupleNicknameQueries.getNickName(),
  });

  return {
    getNickName,
  };
}; 