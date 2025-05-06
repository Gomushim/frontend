import { NotificationSetting,StatusSection,ProfileCardSection } from "@/features/mypage";
import mySettingIcon from "@/assets/images/my_setting.svg";
import { NavBar } from "@/shared/ui";
import { useNavigate } from "react-router";

export const MyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white px-6 py-6">
      {/* 상단 바 */}
      <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 -mx-5 -mt-6">
        <span className="text-2xl font-semibold">마이</span>
        <button type="button" aria-label="설정" className="p-2">
          <img src={mySettingIcon} 
          onClick={() => navigate("/mypage/setting")} alt="설정" className="w-6 h-6" />
        </button>
      </div>
      {/* 컨텐츠 영역 */}
      <div className="max-w-md mx-auto space-y-4">
        <ProfileCardSection />
        <StatusSection />
        <NotificationSetting />
      </div>
      {/* 네비게이션 바 */}
      <div className="z-10 fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] bg-white">
        <NavBar />
      </div>
    </div>
  );
};
