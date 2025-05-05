export type Emotion = "MISS" | "HAPPY" | "COMMON" | "TIRED" | "SAD" | "WORRY" | "ANGRY";


export interface MyEmotionResponse {
  result: {
    emotion: Emotion;
  };
}

export interface MyStatusMessageResponse {
  result: {
    statusMessage: string;
  };
}

export interface MyInfoResponse {
  result: {
    nickname: string;
    isCouple: boolean;
    role: "MEMBER";
  };
} 