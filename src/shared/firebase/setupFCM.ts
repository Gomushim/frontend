// src/firebase/setupFCM.ts
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase 설정 - 클라이언트에서 사용
const firebaseConfig = {
  apiKey: "AIzaSyC-S5AOpvYHralib5BclwodbO7VSi06w8M",
  authDomain: "sarang-push.firebaseapp.com",
  projectId: "sarang-push",
  storageBucket: "sarang-push.firebasestorage.app",
  messagingSenderId: "204100597764",
  appId: "1:204100597764:web:2b2b30c0ae395023251d51",
  measurementId: "G-RYMPP0PNCH",
};

// 클라이언트에서 Firebase 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const VAPID_KEY = import.meta.env.VITE_PUBLIC_VAPID_KEY;

export async function requestNotificationPermission(): Promise<string | null> {
  try {
    const swRegistration = await navigator.serviceWorker.getRegistration("/");

    if (!swRegistration) {
      console.warn("서비스 워커(sw.js)가 등록되지 않았습니다.");
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("알림 권한이 거부되었습니다.");
      return null;
    }

    try {
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: swRegistration,
      });
      // 포그라운드 알림 수신
      onMessage(messaging, payload => {
        console.log("포그라운드 알림 수신:", payload);
        // 알림 UI 표시 로직
      });

      return token;
    } catch (tokenError) {
      console.error("토큰 획득 중 오류:", tokenError);
      return null;
    }
  } catch (error) {
    console.error("FCM 설정 중 오류:", error);
    return null;
  }
}
