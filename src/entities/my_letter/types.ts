export interface Letter {
  letterId: number;
  title: string;
  content: string;
  pictureUrl: string | null;
  createdAt: string;
}

export interface LetterListResponse {
  data: Letter[];
  after: number;
  count: number;
  isLastPage: boolean;
}

export interface GetLetterListToMeParams {
  key?: number;
  take?: number;
} 