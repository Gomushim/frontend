import { Button } from "@/shared/ui";
import kakaoIcon from "@/assets/icons/kakao.svg";
import { getMyInfo } from "@/entities/mypage_info/service";
import { useNavigate } from "react-router";

export const LoginButton = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod/.test(userAgent);

    try {
      const response = await getMyInfo();
      if (response.result.role === "MEMBER") {
        // 온보딩이 완료된 사용자는 메인 페이지로 이동
        navigate("/", { replace: true });
        return;
      } else if (response.result.role === "GUEST") {
        // 온보딩이 필요한 사용자는 온보딩 페이지로 이동
        navigate("/onboarding", { replace: true });
        return;
      }
    } catch (error) {
      console.error("사용자 정보 확인 중 오류 발생:", error);
      handleKakaoLogin(isMobile);
    }
  };

  const handleKakaoLogin = (isMobile: boolean) => {
    if (isMobile) {
      // 모바일: 앱 스킴으로 이동
      window.location.href = "kakaotalk://login";

      // 앱이 설치되어 있지 않은 경우 fallback 처리
      setTimeout(() => {
        window.location.href = "https://sarang-backend.o-r.kr/oauth2/authorization/kakao";
      }, 2000);
    } else {
      // PC: 웹 로그인 URL로 이동
      window.location.href = "https://sarang-backend.o-r.kr/oauth2/authorization/kakao";
    }
  };

  return (
    <Button
      type="button"
      variant="login"
      size="xl"
      className="text-md absolute right-5 bottom-5 left-5 flex pt-5"
      onClick={handleLogin}>
      <img src={kakaoIcon} alt="로그인 버튼" />
      카카오로 계속하기
    </Button>
  );
};
