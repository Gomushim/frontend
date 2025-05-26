import { useQuery } from "@tanstack/react-query";
import { anniversaryQueries } from "./service";

interface UseAnniversaryOptions {
  enabled?: boolean;
}

export const useAnniversary = (options?: UseAnniversaryOptions) => {
  const getDdayQuery = useQuery({
    queryKey: ["dday"],
    queryFn: () => anniversaryQueries.getDday(),
    enabled: options?.enabled,
    staleTime: 0,
    gcTime: 0,
  });

  return {
    getDday: getDdayQuery,
  };
}; 