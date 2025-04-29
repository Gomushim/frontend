import { useQuery } from "@tanstack/react-query";
import { iscoupleQueries } from "./service";

export const useIscouple = () => {
  const checkCoupleConnect = useQuery({
    queryKey: ["coupleConnect"],
    queryFn: () => iscoupleQueries.checkCoupleConnect(),
  });

  return {
    checkCoupleConnect,
  };
}; 