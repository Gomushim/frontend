import { api } from "@/entities/axios/instance";
import { LetterListParams, LetterListResponse } from "./types";

export const getLetterListToMe = async (params: LetterListParams) => {
  const { data } = await api.get<{ result: LetterListResponse }>("/schedules/letters/to-me", {
    params,
  });
  return data.result;
}; 