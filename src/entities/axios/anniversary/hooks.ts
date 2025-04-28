import { useQuery } from "@tanstack/react-query";
import { anniversaryQueries } from "./queries";

export const useAnniversary = () => {
  const getDday = useQuery({
    queryKey: ["dday"],
    queryFn: () => anniversaryQueries.getDday(),
  });

  return {
    getDday,
  };
}; 