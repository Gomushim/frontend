import { Comment } from "@/entities/comment";

export interface Letter {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  creationDate: Date;
  comments: Comment[];
}
