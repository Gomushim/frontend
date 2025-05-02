import { api } from "../axios/instance";
import { DdayRequst, NewDdayResponse } from "./type";

export const createDday = async (data: DdayRequst): Promise<NewDdayResponse> => {
  const response = await api.post<NewDdayResponse>("/couple/new-anniversary", data);
  return response.data;
};
