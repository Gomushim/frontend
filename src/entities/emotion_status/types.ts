export interface GetCoupleEmotionResponse {
  result: {
    emotion: "MISS" | "HAPPY" | "COMMON" | "TIRED" | "SAD" | "WORRY" | "ANGRY";
  };
}

export interface GetStatusMessageResponse {
  result: {
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