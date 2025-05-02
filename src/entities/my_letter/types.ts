export interface Letter {
  letterId: number;
  title: string;
  content: string;
  pictureUrl: string;
  createdAt: string;
}

export interface LetterListResponse {
  result: {
    data: Letter[];
    after: number;
    count: number;
    next: string;
    isLastPage: boolean;
  };
}

export interface GetLetterListToMeParams {
  key?: number;
  orderCreatedAt?: string;
  take?: number;
} 