import { Comment } from "../comment";

export interface Letter {
  letterId: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
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
