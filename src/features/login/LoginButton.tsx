import { Button } from "@/shared/ui";

export const LoginButton = () => {
  const handleLogin = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod/.test(userAgent);

    if (isMobile) {
      // 모바일: 앱 스킴으로 이동
      window.location.href = "kakaotalk://login"; // 실제 앱 스킴으로 수정 필요

      // 앱이 설치되어 있지 않은 경우 fallback 처리
      setTimeout(() => {
        window.location.href = "https://sarang-backend.o-r.kr/oauth2/authorization/kakao";
      }, 2000);
    } else {
      // PC: 웹 로그인 URL로 이동
      window.location.href = "https://sarang-backend.o-r.kr/oauth2/authorization/kakao";
    }
  };

  return <Button onClick={handleLogin}>LoginButton</Button>;
};
