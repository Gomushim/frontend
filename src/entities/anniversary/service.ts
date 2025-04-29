import { DdayResponse } from "./types";
import { api } from "../axios/instance";

export const anniversaryQueries = {
  getDday: async (): Promise<DdayResponse> => {
    const response = await api.get<DdayResponse>("/couple/d-day");
    return response.data;
  },
}; 