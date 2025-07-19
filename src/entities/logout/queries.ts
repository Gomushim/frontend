import { useMutation } from "@tanstack/react-query";
import { logoutQueries } from "./service";

export const useLogout = () => {
  const logoutMutation = useMutation({
    mutationFn: () => logoutQueries.logout(),
  });

  return {
    logout: logoutMutation,
  };
}; 