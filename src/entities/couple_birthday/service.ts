import { CoupleBirthDayResponse } from "./types";
import { api } from "@/entities/axios/instance";

export const getCoupleBirthDay = async (): Promise<CoupleBirthDayResponse> => {
  const response = await api.get<CoupleBirthDayResponse>("/couple/birthday");
  return response.data;
}; 