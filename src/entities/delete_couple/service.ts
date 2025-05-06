import { DeleteMyDataResponse } from "./types";
import { api } from "../axios/instance";

export const deleteMyData = async (): Promise<DeleteMyDataResponse> => {
  const response = await api.delete<DeleteMyDataResponse>("/member/all-my-data");
  return response.data;
}; 