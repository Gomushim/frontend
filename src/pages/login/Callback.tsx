import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) {
        alert("카카오 로그인 실패: code 없음");
        navigate("/login");
        return;
      }

      try {
        await axios.post("https://sarang-backend.o-r.kr/api/auth/kakao/callback", { code }, { withCredentials: true });

        navigate("/");
      } catch (err) {
        console.error("로그인 처리 실패", err);
        alert("로그인 중 문제가 발생했습니다.");
        navigate("/login");
      }
    };

    handleLogin(); // useEffect 안에서 호출
  }, [navigate]);

  return <div className="mt-10 text-center">로그인 처리 중입니다...</div>;
};
