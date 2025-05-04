import ReactDOM from "react-dom/client";
import "../shared/styles/index.css";
import "../shared/styles/index.css";
import { RouterProvider } from "react-router";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./router/routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: 2, // 실패 시 재시도 1회
      refetchOnWindowFocus: false, // 창 포커스 시 refetch 방지
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js",
      options: {
        scope: "/api/",
      },
    },
  });
}
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
if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js",
      options: {
        scope: "/api/",
      },
    },
  });
}
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