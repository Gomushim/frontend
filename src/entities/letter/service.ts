import { api } from "../axios/instance";
import { WriteLetterResponse } from "./type";

export const createLetter = async (data: FormData): Promise<WriteLetterResponse> => {
  const response = await api.post<WriteLetterResponse>("/schedules/letters", data);
  return response.data;
};
