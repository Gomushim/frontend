import { api } from "../axios/instance";
import { CommentRequest, CommentResponse } from "./type";

export const createComment = async (letterId: string, data: CommentRequest): Promise<CommentResponse> => {
  const response = await api.post<CommentResponse>(`/schedules/letters/${letterId}/comments`, data);
  return response.data;
};
