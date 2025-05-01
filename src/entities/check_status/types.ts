export interface GetCoupleStatusMessageResponse {
  result: {
    statusMessage: string;
  };
}

export interface GetCoupleEmotionResponse {
  result: {
    emotion: "MISS" | "HAPPY" | "COMMON" | "TIRED" | "SAD" | "WORRY" | "ANGRY";
    statusMessage: string;
  };
}

export interface UpdateEmotionAndStatusMessageRequest {
  emotion: "MISS" | "HAPPY" | "COMMON" | "TIRED" | "SAD" | "WORRY" | "ANGRY";
  statusMessage: string;
}

export interface UpdateEmotionAndStatusMessageResponse {
  result: boolean;
} 