import { api } from "../axios/instance";
import { LetterListResponse } from "./types";

export const getLetterListMain = async () => {
  const response = await api.get<LetterListResponse>("/schedules/letters/main");
  return response.data;
}; 