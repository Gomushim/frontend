// src/notification/setupFCM.ts
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "@/sw";
import axios from "axios";

const VAPID_KEY = import.meta.env.VITE_PUBLIC_VAPID_KEY; // FCM 콘솔에서 확인 가능

export async function requestNotificationPermission(userId: string) {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("알림 권한이 거부되었습니다.");
      return;
    }

    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    console.log("FCM 토큰:", token);

    // 👉 서버로 토큰 전송
    await axios.post("/api/save-fcm-token", {
      userId,
      token,
    });

    console.log("FCM 토큰 전송 완료");

    // 포그라운드 알림 수신
    onMessage(messaging, payload => {
      console.log("포그라운드 알림 수신:", payload);
      // 원하면 UI에 알림 띄우는 처리도 가능
    });
  } catch (error) {
    console.error("FCM 설정 중 오류:", error);
  }
}
