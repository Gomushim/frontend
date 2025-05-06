import { useQuery } from "@tanstack/react-query";
import { initSettingQueries } from "./service";
import { GetCoupleInfoResponse } from "./types";

export const useInitSettingQueries = () => {
  const getCoupleInfo = useQuery<GetCoupleInfoResponse>({
    queryKey: ["getCoupleInfo"],
    queryFn: () => initSettingQueries.getCoupleInfo(),
  });

  return {
    getCoupleInfo,
  };
}; 