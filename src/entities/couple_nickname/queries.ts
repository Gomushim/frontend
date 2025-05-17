import { useQuery } from "@tanstack/react-query";
import { coupleNicknameQueries } from "./service";

export const useCoupleNickname = (enabled?: boolean) => {
  const getNickName = useQuery({
    queryKey: ["coupleNickname"],
    queryFn: () => coupleNicknameQueries.getNickName(),
    enabled: enabled,
  });

  return {
    getNickName,
  };
};
