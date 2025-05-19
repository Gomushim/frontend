import { useQuery } from "@tanstack/react-query";
import { iscoupleQueries } from "./service";

export const useIscouple = () => {
  const checkCoupleConnect = useQuery({
    queryKey: ["checkCoupleConnect"],
    queryFn: () => iscoupleQueries.checkCoupleConnect(),
    retry: 2,
    refetchInterval: 1000 * 60,
    staleTime: 0,
    gcTime: 0,
  });

  return {
    checkCoupleConnect,
  };
};
