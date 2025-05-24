import { useMutation } from "@tanstack/react-query";
import { deleteMyData } from "./service";

export const useDeleteMyData = () => {
  return useMutation({
    mutationFn: deleteMyData,
  });
}; 