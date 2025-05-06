import { useQuery } from "@tanstack/react-query";
import { getCoupleBirthDay } from "./service";

export const useCoupleBirthDay = () => {
  return useQuery({
    queryKey: ["coupleBirthDay"],
    queryFn: getCoupleBirthDay,
  });
}; 