import { useQuery } from "@tanstack/react-query";
import { getMyEmotion, getMyStatusMessage, getMyInfo } from "./service";
import { MyEmotionResponse, MyStatusMessageResponse, MyInfoResponse } from "./types";

export const useMyEmotion = () => {
  return useQuery<MyEmotionResponse>({
    queryKey: ["myEmotion"],
    queryFn: getMyEmotion,
  });
};

export const useMyStatusMessage = () => {
  return useQuery<MyStatusMessageResponse>({
    queryKey: ["myStatusMessage"],
    queryFn: getMyStatusMessage,
  });
};

export const useMyInfo = () => {
  return useQuery<MyInfoResponse>({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });
}; 