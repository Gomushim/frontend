import { DdayResponse } from "./types";
import { api } from "../instance";

export const anniversaryQueries = {
  getDday: async (): Promise<DdayResponse> => {
    const response = await api.get<DdayResponse>("/v1/couple/d-day");
    return response.data;
  },
}; 