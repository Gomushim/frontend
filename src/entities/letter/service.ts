import { api } from "../axios/instance";
import { LetterDetailResponse, LetterListResponse, WriteLetterResponse } from "./type";

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

export const getLetterList = async ({
  orderCreatedAt,
  take,
}: {
  key: number;
  orderCreatedAt: "asc" | "desc";
  take: number;
}): Promise<LetterListResponse> => {
  const response = await api.get<LetterListResponse>("/schedules/letters", {
    params: { orderCreatedAt: orderCreatedAt, take: take },
  });
  return response.data;
};
