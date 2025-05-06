import { api } from "@/entities/axios/instance";
import {
  UpdateMyNicknameRequest,
  UpdateMyBirthDateRequest,
  UpdateRelationshipStartDateRequest,
  UpdateMilitaryDateRequest,
  UpdateResponse,
} from "./types";

export const updateMyNickname = async (data: UpdateMyNicknameRequest): Promise<UpdateResponse> => {
  const response = await api.post<UpdateResponse>("/member/my-nickname", data);
  return response.data;
};

export const updateMyBirthDate = async (data: UpdateMyBirthDateRequest): Promise<UpdateResponse> => {
  const response = await api.post<UpdateResponse>("/member/my-birthday", data);
  return response.data;
};

export const updateRelationshipStartDate = async (data: UpdateRelationshipStartDateRequest): Promise<UpdateResponse> => {
  const response = await api.post<UpdateResponse>("/couple/relationship-start-date", data);
  return response.data;
};

export const updateMilitaryDate = async (data: UpdateMilitaryDateRequest): Promise<UpdateResponse> => {
  const response = await api.post<UpdateResponse>("/couple/military-date", data);
  return response.data;
}; 