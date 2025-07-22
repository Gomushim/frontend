import { useQuery } from "@tanstack/react-query";
import { coupleNicknameQueries } from "./service";

export const useCoupleNickname = (enabled?: boolean) => {
  const getNickName = useQuery({
    queryKey: ["coupleNickname"],
    queryFn: () => coupleNicknameQueries.getNickName(),
    enabled: enabled,
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
    gcTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
  });

  return {
    getNickName,
  };
};
