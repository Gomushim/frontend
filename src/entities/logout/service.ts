import { LogoutResponse } from "./types";
import { api } from "../axios/instance";

export const logoutQueries = {
  logout: async (): Promise<LogoutResponse> => {
    const response = await api.post<LogoutResponse>("/auth/logout");
    return response.data;
  },
}; 