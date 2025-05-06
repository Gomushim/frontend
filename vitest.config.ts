import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "happy-dom", // 브라우저 환경이 필요한 경우 (ex: DOM 관련 테스트)
    coverage: {
      reporter: ["text", "json", "html"], // 커버리지 리포트 형식
      exclude: ["node_modules/", "dist/", "tests/helpers/"], // 커버리지에서 제외할 파일
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 경로 별칭 설정
    },
  },
});
