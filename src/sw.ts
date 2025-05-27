/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

let allowlist: RegExp[] | undefined;
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) allowlist = [/^\/$/];

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist }));

self.skipWaiting();
clientsClaim();

// Firebase 메시징을 위한 설정
const firebaseConfig = {
  apiKey: "AIzaSyC-S5AOpvYHralib5BclwodbO7VSi06w8M",
  authDomain: "sarang-push.firebaseapp.com",
  projectId: "sarang-push",
  storageBucket: "sarang-push.firebasestorage.app",
  messagingSenderId: "204100597764",
  appId: "1:204100597764:web:2b2b30c0ae395023251d51",
  measurementId: "G-RYMPP0PNCH",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 메시지 ID를 저장할 Set
const processedMessageIds = new Set();

// Firebase 백그라운드 메시지 처리
try {
  onBackgroundMessage(messaging, payload => {
    console.log("백그라운드 메시지 수신:", payload);

    // 메시지 ID 확인 (없으면 타임스탬프 사용)
    const messageId = payload.data?.messageId || payload.messageId || Date.now().toString();

    // 이미 처리된 메시지인지 확인
    if (processedMessageIds.has(messageId)) {
      console.log("중복 메시지 무시:", messageId);
      return;
    }

    // 메시지 ID 저장
    processedMessageIds.add(messageId);

    // 1분 후 메시지 ID 제거 (메모리 관리)
    setTimeout(() => {
      processedMessageIds.delete(messageId);
    }, 60000);

    const notificationTitle = payload.notification?.title || "새 알림";
    const notificationOptions = {
      body: payload.notification?.body || "",
      icon: "/pwa-192x192.png",
      data: payload.data,
      tag: messageId, // 같은 tag를 가진 알림은 대체됨
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (error) {
  console.error("Firebase 초기화 중 오류:", error);
}

// 알림 클릭 이벤트 처리
self.addEventListener("notificationclick", event => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then(clientList => {
      for (const client of clientList) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});
