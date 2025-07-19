import { MyHeader } from "@/features/mypage/ui/MyPageHeader";
import { LogoutModal } from "@/features/mypage/ui";
import { useNavigate } from "react-router";
import { useToggle } from "@/shared/hooks/useToggle";
import { useIscouple } from "@/entities/iscouple/queries";

export const SettingPage = () => {
  const navigate = useNavigate();
  const { isToggle: isLogoutModalOpen, onOpenToggle: openLogoutModal, onCloseToggle: closeLogoutModal } = useToggle();
 const { checkCoupleConnect } = useIscouple();
  const isConnected = checkCoupleConnect.data?.result ?? false;
  const handleLogout = () => {
    // 실제 로그아웃 로직으로 대체
    alert("로그아웃 되었습니다.");
    closeLogoutModal();
  };

  return (
    <div className="min-h-screen bg-white pt-11">
      <MyHeader title="설정" onBack={() => navigate("/mypage")} />
      <div className="px-4 pt-2 space-y-4">
        <button
          className="w-full text-left bg-gray-50 rounded-2xl mb-3 px-4 py-5 text-gray-900 text-base font-medium"
          onClick={openLogoutModal}
        >
          로그아웃
        </button>
        <button
          onClick={() => isConnected && navigate("/mypage/disconnect")}
          className={`w-full flex items-center justify-between bg-gray-50 rounded-2xl mb-1 px-4 py-5 text-gray-900 text-base font-medium ${!isConnected ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!isConnected}
        >
          커플 연결 해제
        </button>
      </div>
      <LogoutModal 
        open={isLogoutModalOpen} 
        onClose={closeLogoutModal} 
        onLogout={handleLogout} 
      />
    </div>
  );
};

