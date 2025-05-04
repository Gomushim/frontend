import { api } from "../axios/instance";
import { DDayListResponse, DdayRequst, NewDdayResponse } from "./type";

export const createDday = async (data: DdayRequst): Promise<NewDdayResponse> => {
  const response = await api.post<NewDdayResponse>("/couple/new-anniversary", data);
  return response.data;
};

export const getDdayList = async ({
  orderCreatedAt,
  take,
}: {
  key: number;
  orderCreatedAt: "asc" | "desc";
  take: number;
}): Promise<DDayListResponse> => {
  const response = await api.get<DDayListResponse>("/anniversaries", {
    params: { orderCreatedAt: orderCreatedAt, take: take },
  });
  return response.data;
};
