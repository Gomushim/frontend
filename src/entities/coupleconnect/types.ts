export interface ConnectCoupleRequest {
  coupleCode: string;
}

export interface ConnectCoupleResponse {
  result: {
    id: number;
    invitorId: number;
    inviteeId: number;
    relationshipStartDate: string;
    militaryStartDate: string;
    militaryEndDate: string;
    military: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
  };
}

export interface GenerateCoupleCodeResponse {
  code: string;
} 