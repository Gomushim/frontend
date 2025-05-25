export interface Letter {
  letterId: string;
  scheduleId: string;
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
