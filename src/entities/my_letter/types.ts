export interface Letter {
  letterId: number;
  title: string;
  content: string;
  pictureUrl: string;
  createdAt: string;
}

export interface LetterListResponse {
  data: Letter[];
  after: number;
  count: number;
  next: string;
  isLastPage: boolean;
}

export interface LetterListParams {
  key?: number;
  orderCreatedAt?: string;
  take?: number;
} 