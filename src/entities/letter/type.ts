import { Comment } from "../comment";

export interface Letter {
  letterId: string;
  scheduleId: string;
  scheduleTitle?: string;
  title: string;
  content: string;
  pictureUrl: string;
  createdAt: string;
  isWrittenByMe: boolean;
  comments: Comment[];
}

export type LetterList = Omit<Letter, "comments">[];

// API 통신에 필요한 타입
export interface WriteLetterResponse {
  result: string;
}

export interface LetterDetailResponse {
  result: {
    letter: {
      id: string;
      title: string;
      content: string;
      author: string;
      createdAt: string;
    };
    pictures: {
      id: string;
      pictureUrl: string;
      letterId: number;
    }[];
    comments: {
      id: string;
      content: string;
      author: string;
      createdAt: string;
    }[];
  };
}

export interface LetterListResponse {
  data: LetterList;
  after: number;
  count: number;
  isLastPage: boolean;
}

export interface UpdateLetterRequest {
  upsertLetterRequest: {
    letterId: string | null;
    scheduleId: string;
    title: string;
    content: string;
    pictureUrls?: string[];
  };
  pictures?: string[];
}
