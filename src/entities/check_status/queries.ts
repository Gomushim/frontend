import { useQuery } from "@tanstack/react-query";
import { checkStatusQueries } from "./service";
import { GetCoupleEmotionResponse } from "./types";
import { api } from "@/entities/axios/instance";

export const useCheckStatus = () => {
  const getCoupleStatusMessage = useQuery({
    queryKey: ["coupleStatusMessage"],
    queryFn: () => checkStatusQueries.getCoupleStatusMessage(),
  });

  const getCoupleEmotion = async () => {
    const response = await api.get<GetCoupleEmotionResponse>("/couple/emotion");
    return response.data;
  };

  return {
    getCoupleStatusMessage,
    getCoupleEmotion,
  };
}; 