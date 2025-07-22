import { useQuery } from "@tanstack/react-query";
import { iscoupleQueries } from "./service";

export const useIscouple = () => {
  const checkCoupleConnect = useQuery({
    queryKey: ["checkCoupleConnect"],
    queryFn: () => iscoupleQueries.checkCoupleConnect(),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
    gcTime: Infinity,
  });

  return {
    checkCoupleConnect,
  };
};
