// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");

  // MSW가 특정 API 요청만 가로채도록 설정
  worker.start({
    onUnhandledRequest: "bypass", // 처리하지 않는 요청은 통과
    serviceWorker: {
      url: "/mockServiceWorker.js",
      options: {
        // API 경로만 처리하도록 스코프 제한 (필요한 경우)
        scope: "/api/",
      },
    },
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// service worker 등록
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(reg => {
        console.log("Service worker registered:", reg);
      })
      .catch(err => {
        console.error("Service worker registration failed:", err);
      });
  });
}
