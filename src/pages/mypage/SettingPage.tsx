import { MyHeader } from "@/features/mypage/ui/MyPageHeader";
import { LogoutModal } from "@/features/mypage/ui";
import { useState } from "react";
import NextArrow  from "@/assets/images/next_arrow.svg";
import { useNavigate } from "react-router";

export const SettingPage = () => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    // 실제 로그아웃 로직으로 대체
    alert("로그아웃 되었습니다.");
    setLogoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <MyHeader title="설정" />
      <div className="px-4 pt-2 space-y-4">
        <button
          className="w-full text-left bg-gray-50 rounded-2xl mb-3 px-4 py-5 text-gray-900 text-base font-medium"
          onClick={() => setLogoutOpen(true)}
        >
          로그아웃
        </button>
        <button onClick={() => navigate("/mypage/disconnect")} className="w-full flex items-center justify-between bg-gray-50 rounded-2xl mb-1 px-4 py-5 text-gray-900 text-base font-medium">
          <span>커플 연결 끊기</span>
          <img src={NextArrow}  alt="설정" className="w-4 h-4" />
        </button>
      </div>
      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} onLogout={handleLogout} />
    </div>
  );
};

