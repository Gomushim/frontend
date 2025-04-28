import { RegisterAnniversaryRequest, RegisterAnniversaryResponse } from "./types";
import { api } from "../instance";

export const maonboardingQueries = {
  registerAnniversary: async (data: RegisterAnniversaryRequest): Promise<RegisterAnniversaryResponse> => {
    const response = await api.post<RegisterAnniversaryResponse>("/v1/couple/anniversary", data);
    return response.data;
  },
}; 