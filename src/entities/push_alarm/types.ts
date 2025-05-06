export interface NotificationPolicy {
  dday: boolean;
  partnerStatus: boolean;
}

export interface NotificationResponse {
  result: NotificationPolicy;
}

export interface UpdateNotificationRequest {
  dday: boolean;
  partnerStatus: boolean;
}

export interface UpdateNotificationResponse {
  result: boolean;
} 