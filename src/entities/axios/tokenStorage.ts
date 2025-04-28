const ACCESS_TOKEN_KEY = "access_token";

export const getAccessToken = (): string | null => {
  // HttpOnly 쿠키는 JavaScript에서 직접 접근할 수 없으므로
  // 서버에서 설정한 쿠키를 그대로 사용
  return null;
};

export const setAccessToken = (token: string): void => {
  // HttpOnly 쿠키는 서버에서 설정하므로
  // 클라이언트에서는 설정하지 않음
};

export const removeAccessToken = (): void => {
  // HttpOnly 쿠키는 서버에서 설정하므로
  // 클라이언트에서는 제거하지 않음
};
