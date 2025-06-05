import { api } from "../axios/instance";
import { LetterDetailResponse, LetterListResponse, WriteLetterResponse, LetterListMainResponse } from "./type";

export const createLetter = async (data: FormData): Promise<WriteLetterResponse> => {
  const response = await api.post<WriteLetterResponse>("/schedules/letters", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getLetterDetail = async (scheduleId: string, letterId: string): Promise<LetterDetailResponse> => {
  const response = await api.get<LetterDetailResponse>(`/schedules/${scheduleId}/letters/${letterId}`);
  return response.data;
};

export const getLetterList = async ({ page, size }: { page: number; size: number }): Promise<LetterListResponse> => {
  const response = await api.get<LetterListResponse>("/schedules/letters", {
    params: { page: page, size: size },
  });
  return response.data;
};

export const deleteLetter = async (scheduleId: string, letterId: string) => {
  const response = await api.delete(`/schedules/${scheduleId}/letters/${letterId}`);
  return response.data;
};

export const updateLetter = async (data: FormData) => {
  const response = await api.post("/schedules/letters", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getLetterListMain = async () => {
  const response = await api.get<LetterListMainResponse>("/schedules/letters/main");
  return response.data;
};
