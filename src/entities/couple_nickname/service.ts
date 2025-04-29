import { CoupleNicknameResponse } from "./types";
import { api } from "../axios/instance";

export const coupleNicknameQueries = {
  getNickName: async (): Promise<CoupleNicknameResponse> => {
    const response = await api.get<CoupleNicknameResponse>("/couple/nick-name");
    return response.data;
  },
}; 