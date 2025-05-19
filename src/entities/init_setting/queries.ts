import { useQuery } from "@tanstack/react-query";
import { initSettingQueries } from "./service";
import { GetCoupleInfoResponse } from "./types";

export const useInitSettingQueries = () => {
  const getCoupleInfo = useQuery<GetCoupleInfoResponse>({
    queryKey: ["getCoupleInfo"],
    queryFn: () => initSettingQueries.getCoupleInfo(),
    retry: 2,
    refetchInterval: 1000 * 60,
    staleTime: 0,
    gcTime: 0,
  });

  return {
    getCoupleInfo,
  };
};
