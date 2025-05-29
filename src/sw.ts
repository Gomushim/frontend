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
export const messaging = getMessaging(app);

// 서비스 워커에서 Firebase 사용 시 오류 처리가 중요합니다
try {
  onBackgroundMessage(messaging, payload => {
    console.log("백그라운드 메시지 수신:", payload);

    // 데이터 메시지(data-only)인 경우에만 알림 표시
    if (!payload.notification) {
      const notificationTitle = payload.data?.title || "새 알림";
      const notificationOptions = {
        body: payload.data?.body || "",
        icon: "/pwa-192x192.png",
        data: payload.data,
      };
      self.registration.showNotification(notificationTitle, notificationOptions);
    }
  });
} catch (error) {
  console.error("Firebase 초기화 중 오류:", error);
}

// 푸시 이벤트 처리
self.addEventListener("push", event => {
  if (!event.data) return;

  try {
    const payload = event.data.json();
    // notification 메시지가 있는 경우에만 알림 표시
    if (payload.notification) {
      const title = payload.notification?.title || "새 알림";
      const options = {
        body: payload.notification?.body || "",
        icon: "/pwa-192x192.png",
        data: payload.data,
      };
      event.waitUntil(self.registration.showNotification(title, options));
    }
  } catch (error) {
    console.error("푸시 메시지 처리 중 오류:", error);
  }
});

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
