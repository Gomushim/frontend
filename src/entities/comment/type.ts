export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
}

// API 요청에서 사용하는 타입
export interface CommentRequest {
  commentId: string | null;
  content: string;
}

export interface CommentResponse {
  result: boolean;
}
