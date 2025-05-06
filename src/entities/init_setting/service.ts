import { RegisterAnniversaryRequest, RegisterAnniversaryResponse, GetCoupleInfoResponse } from "./types";
import { api } from "../axios/instance";

export const initSettingQueries = {
  registerAnniversary: async (data: RegisterAnniversaryRequest): Promise<RegisterAnniversaryResponse> => {
    const response = await api.post<RegisterAnniversaryResponse>("/couple/anniversary", data);
    return response.data;
  },

  getCoupleInfo: async (): Promise<GetCoupleInfoResponse> => {
    const response = await api.get<GetCoupleInfoResponse>("/couple");
    return response.data;
  },
}; 