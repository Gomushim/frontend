import { api } from "../axios/instance";
import { GetLetterListToMeParams, LetterListResponse } from "./types";

export const getLetterListToMe = async (params?: GetLetterListToMeParams) => {
  const response = await api.get<LetterListResponse>("/schedules/letters/to-me", {
    params,
  });
  return response.data;
}; 