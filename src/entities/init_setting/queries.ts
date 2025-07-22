import { useQuery } from "@tanstack/react-query";
import { initSettingQueries } from "./service";
import { GetCoupleInfoResponse } from "./types";

export const useInitSettingQueries = () => {
  const getCoupleInfo = useQuery<GetCoupleInfoResponse>({
    queryKey: ["getCoupleInfo"],
    queryFn: () => initSettingQueries.getCoupleInfo(),
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
    gcTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
  });

  return {
    getCoupleInfo,
  };
};
