import { NotificationSetting, StatusSection, ProfileCardSection } from "@/features/mypage";
import mySettingIcon from "@/assets/images/my_setting.svg";
import { useNavigate } from "react-router";
import { NavBar } from "@/widgets/navbar/ui";

export const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6 py-6">
      {/* 상단 바 */}
      <div className="-mx-5 -mt-6 mb-6 flex items-center justify-between bg-gray-50 p-4 pt-11">
        <span className="text-2xl font-semibold">마이</span>
        <button type="button" aria-label="설정" className={"p-2"} onClick={() => navigate("/mypage/setting")}>
          <img src={mySettingIcon} alt="설정" className="h-6 w-6" />
        </button>
      </div>
      {/* 컨텐츠 영역 */}
      <div className="w-full space-y-4">
        <ProfileCardSection />
        <StatusSection />
        <NotificationSetting />
      </div>
      {/* 네비게이션 바 */}
      <div className="pc:w-[375px] fixed bottom-0 left-1/2 z-10 w-full -translate-x-1/2 bg-white">
        <NavBar isConnected={true} isInitialized={true} />
      </div>
    </div>
  );
};
