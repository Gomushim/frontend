import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateMyNickname,
  updateMyBirthDate,
  updateRelationshipStartDate,
  updateMilitaryDate,
} from "./service";
import {
  UpdateMyNicknameRequest,
  UpdateMyBirthDateRequest,
  UpdateRelationshipStartDateRequest,
  UpdateMilitaryDateRequest,
} from "./types";

export const useUpdateMyNickname = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMyNicknameRequest) => updateMyNickname(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupleNickname"] });
    },
  });
};

export const useUpdateMyBirthDate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMyBirthDateRequest) => updateMyBirthDate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupleBirthDay"] });
    },
  });
};

export const useUpdateRelationshipStartDate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateRelationshipStartDateRequest) => updateRelationshipStartDate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationshipStartDate"] });
    },
  });
};

export const useUpdateMilitaryDate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMilitaryDateRequest) => updateMilitaryDate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["militaryDate"] });
    },
  });
}; 