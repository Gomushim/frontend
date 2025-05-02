import { Comment } from "@/entities/comment";

export interface Letter {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  creationDate: Date;
  comments: Comment[];
}

export type LetterList = Omit<Letter, "comments">[];

// API 통신에 필요한 타입
export interface WriteLetterResponse {
  result: string;
}
