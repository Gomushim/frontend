export interface RegisterAnniversaryRequest {
  coupleId: number;
  relationshipStartDate: string;
  militaryStartDate: string;
  militaryEndDate: string;
  military: "ARMY" | "NAVY" | "AIR_FORCE" | "MARINE";
}

export interface RegisterAnniversaryResponse {
  result: boolean;
} 