import { useQuery } from "@tanstack/react-query";
import { iscoupleQueries } from "./queries";

export const useIscouple = () => {
  const checkCoupleConnect = useQuery({
    queryKey: ["coupleConnect"],
    queryFn: () => iscoupleQueries.checkCoupleConnect(),
  });

  return {
    checkCoupleConnect,
  };
}; 