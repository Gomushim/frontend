import { api } from "../axios/instance";
import { DDayListResponse, DdayRequst, DeleteDdayResponse, MainDdayListResponse, NewDdayResponse } from "./model";

export const createDday = async (data: DdayRequst): Promise<NewDdayResponse> => {
  const response = await api.post<NewDdayResponse>("/couple/new-anniversary", data);
  return response.data;
};

export const getDdayList = async ({ page, size }: { page: number; size: number }): Promise<DDayListResponse> => {
  const response = await api.get<DDayListResponse>("/anniversaries", {
    params: { page: page, size: size },
  });
  return response.data;
};

export const getMainDdayList = async (): Promise<MainDdayListResponse> => {
  const response = await api.get<MainDdayListResponse>("anniversary/main");
  return response.data;
};

export const updateDday = async (data: DdayRequst): Promise<NewDdayResponse> => {
  const response = await api.put<NewDdayResponse>(`/couple/new-anniversary/${data.id}`, data);
  return response.data;
};

export const deleteDday = async (ddayId: string): Promise<DeleteDdayResponse> => {
  const response = await api.delete<DeleteDdayResponse>(`/anniversary/${ddayId}`);
  return response.data;
};
