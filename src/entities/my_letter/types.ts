export interface Letter {
  letterId: number;
  title: string;
  content: string;
  pictureUrl: string;
  schedule: string;
  createdAt: string;
}

export interface LetterListResponse {
  result: Letter[];
}

export interface GetLetterListToMeParams {
  key?: number;
  take?: number;
} 