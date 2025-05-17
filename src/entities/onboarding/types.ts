export interface OnboardingRequest {
  nickname: string;
  birthDate: string;
  fcmToken: string;
  isNotification: boolean;
}

export interface OnboardingResponse {
  // API 응답 타입 정의
  success: boolean;
  data?: any;
  message?: string;
} 