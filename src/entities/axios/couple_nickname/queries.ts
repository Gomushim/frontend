import { CoupleNicknameResponse } from "./types";
import { api } from "../instance";

export const coupleNicknameQueries = {
  getNickName: async (): Promise<CoupleNicknameResponse> => {
    const response = await api.get<CoupleNicknameResponse>("/v1/couple/nick-name");
    return response.data;
  },
}; 