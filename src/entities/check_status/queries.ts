import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { checkStatusQueries } from "./service";
import { GetCoupleEmotionResponse, UpdateEmotionAndStatusMessageRequest } from "./types";
import { api } from "@/entities/axios/instance";

export const useCheckStatus = () => {
  const queryClient = useQueryClient();

  const getCoupleStatusMessage = useQuery({
    queryKey: ["coupleStatusMessage"],
    queryFn: checkStatusQueries.getCoupleStatusMessage,
  });

  const getCoupleEmotion = useQuery({
    queryKey: ["coupleEmotion"],
    queryFn: checkStatusQueries.getCoupleEmotion,
  });

  const updateMyEmotionAndStatusMessage = useMutation({
    mutationFn: (data: UpdateEmotionAndStatusMessageRequest) =>
      checkStatusQueries.updateMyEmotionAndStatusMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupleEmotion"] });
    },
  });

  const getCoupleEmotionFromApi = async () => {
    const response = await api.get<GetCoupleEmotionResponse>("/couple/emotion");
    return response.data;
  };

  return {
    getCoupleStatusMessage,
    getCoupleEmotion,
    updateMyEmotionAndStatusMessage,
    getCoupleEmotionFromApi,
  };
}; 