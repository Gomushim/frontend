import { RegisterAnniversaryRequest, RegisterAnniversaryResponse } from "./types";
import { api } from "../axios/instance";

export const maonboardingQueries = {
  registerAnniversary: async (data: RegisterAnniversaryRequest): Promise<RegisterAnniversaryResponse> => {
    const response = await api.post<RegisterAnniversaryResponse>("/couple/anniversary", data);
    return response.data;
  },
}; 