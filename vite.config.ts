import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import svgr from "vite-plugin-svgr";
import fs from "fs";

const isDev = process.env.NODE_ENV !== "production";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: isDev
    ? {
        https: {
          key: fs.readFileSync(path.resolve(__dirname, "_wildcard.sarangkkun.site+2-key.pem")),
          cert: fs.readFileSync(path.resolve(__dirname, "_wildcard.sarangkkun.site+2.pem")),
        },
        host: "vite.sarangkkun.site",
        port: 5173,
      }
    : {},
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    VitePWA({
      strategies: "injectManifest",
      injectRegister: "auto",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "prompt",
      manifest: {
        id: "sarang.vercel.app",
        name: "사랑꾼",
        short_name: "사랑꾼",
        description: "사랑꾼",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "fullscreen",
        display_override: ["fullscreen", "standalone"],
        orientation: "portrait-primary",
        start_url: "/",
        launch_handler: {
          client_mode: ["navigate-existing", "auto"],
        },
        icons: [
          // 안드로이드 아이콘
          {
            src: "android/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "android/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android/android-launchericon-144-144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "android/android-launchericon-96-96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "android/android-launchericon-72-72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "android/android-launchericon-48-48.png",
            sizes: "48x48",
            type: "image/png",
          },

          // iOS 아이콘 (주요 크기)
          {
            src: "ios/76.png",
            sizes: "76x76",
            type: "image/png",
          },
          {
            src: "ios/120.png",
            sizes: "120x120",
            type: "image/png",
          },
          {
            src: "ios/180.png",
            sizes: "180x180",
            type: "image/png",
          },

          // Windows 11 아이콘 (주요 크기)
          {
            src: "windows11/Square44x44Logo.scale-100.png",
            sizes: "44x44",
            type: "image/png",
          },
          {
            src: "windows11/Square150x150Logo.scale-100.png",
            sizes: "150x150",
            type: "image/png",
          },
          {
            src: "windows11/Square150x150Logo.scale-200.png",
            sizes: "300x300",
            type: "image/png",
          },
          {
            src: "windows11/Square150x150Logo.scale-400.png",
            sizes: "600x600",
            type: "image/png",
          },
          {
            src: "windows11/Wide310x150Logo.scale-100.png",
            sizes: "310x150",
            type: "image/png",
          },
          {
            src: "windows11/LargeTile.scale-100.png",
            sizes: "310x310",
            type: "image/png",
          },

          // Maskable 아이콘 (적응형 아이콘 지원)
          {
            src: "android/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "android/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        // Splash Screens (PWA 설치 시)
        screenshots: [
          {
            src: "splash/ios/iPhone_16_Pro_Max_portrait.png",
            sizes: "1290x2796",
            type: "image/png",
            label: "iOS Splash",
          },
          {
            src: "splash/ios/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png",
            sizes: "1284x2778",
            type: "image/png",
            label: "iOS Splash",
          },
          {
            src: "splash/ios/12.9__iPad_Pro_portrait.png",
            sizes: "2048x2732",
            type: "image/png",
            label: "iOS Splash",
          },
          {
            src: "splash/ios/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",
            sizes: "640x1136",
            type: "image/png",
            label: "iOS Splash",
          },
          {
            src: "splash/ios/icon.png",
            sizes: "1024x1024",
            type: "image/png",
            label: "iOS Splash",
          },
        ],
      },

      injectManifest: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        injectionPoint: "self.__WB_MANIFEST",
        maximumFileSizeToCacheInBytes: 5000000,
      },

      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
      },

      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
  ],
});
