export interface UpdateMyNicknameRequest {
  nickname: string;
}

export interface UpdateMyBirthDateRequest {
  birthDate: string;
}

export interface UpdateRelationshipStartDateRequest {
  relationshipStartDate: string;
}

export interface UpdateMilitaryDateRequest {
  militaryStartDate: string;
  militaryEndDate: string;
}

export interface UpdateResponse {
  result: boolean;
} 