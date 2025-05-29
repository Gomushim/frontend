import { useQuery } from "@tanstack/react-query";
import { getCoupleBirthDay } from "./service";

export const useCoupleBirthDay = () => {
  return useQuery({
    queryKey: ["coupleBirthDay"],
    queryFn: getCoupleBirthDay,
    refetchInterval: 1000 * 60,
    staleTime: 0,
    gcTime: 0,
  });
}; 