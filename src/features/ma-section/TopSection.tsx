import NotificationIcon from "@/assets/images/notification.svg";
import InitBg from "@/assets/images/initbg.svg";
import ArmyBg from "@/assets/images/armybg.svg";
import NavyBg from "@/assets/images/navybg.svg";
import AirBg from "@/assets/images/airbg.svg";
import CoupleHeart from "@/assets/images/couple_heart.svg";
import { useNavigate } from "react-router";
import { useOnboardingStore } from "@/stores/maonboardingStore";
import { useEffect, useState } from "react";
import { coupleNicknameQueries } from "@/entities/couple_nickname/service";
import { maonboardingQueries } from "@/entities/maonboarding/service";

interface TopSectionProps {
  isConnected: boolean;
  isInitialized: boolean;
}

interface CoupleInfo {
  userNickname: string;
  coupleNickname: string;
}

type MilitaryBranch = "ARMY" | "NAVY" | "AIR_FORCE" | "MARINE";

export const TopSection: React.FC<TopSectionProps> = ({ isConnected, isInitialized }) => {
  const navigate = useNavigate();
  const { militaryBranch, setMilitaryBranch } = useOnboardingStore();
  const [coupleInfo, setCoupleInfo] = useState<CoupleInfo>({ userNickname: "", coupleNickname: "" });

  const fetchCoupleNicknames = async () => {
    try {
      const response = await coupleNicknameQueries.getNickName();
      setCoupleInfo({
        userNickname: response.result.userNickname,
        coupleNickname: response.result.coupleNickname,
      });
    } catch (error) {
      console.error("닉네임 조회 실패:", error);
      setCoupleInfo({ userNickname: "", coupleNickname: "" });
    }
  };

  const initializeData = async () => {
    if (!isConnected) return;

    try {
      await fetchCoupleNicknames();
      const coupleInfoResponse = await maonboardingQueries.getCoupleInfo();
      setMilitaryBranch(coupleInfoResponse.result.military);
    } catch (error) {
      console.error("초기설정 오류류발생:", error);
    }
  };

  useEffect(() => {
    initializeData();
  }, [isConnected, setMilitaryBranch]);

  const handleInitialize = () => {
    navigate("/onboarding/firstmeet");
  };

  const getBackgroundImage = () => {
    if (!isConnected || !isInitialized) return InitBg;

    const backgroundMap: Record<MilitaryBranch, string> = {
      ARMY: ArmyBg,
      NAVY: NavyBg,
      AIR_FORCE: AirBg,
      MARINE: NavyBg,
    };

    return backgroundMap[militaryBranch as MilitaryBranch] || InitBg;
  };

  const renderNotConnectedContent = () => (
    <>
      <h1 className="text-2xl font-bold text-gray-50">
        커플 연결이<br />
        필요해요
      </h1>
      <button
        onClick={() => navigate("/onboarding/couple-contact")}
        className="mt-2 flex items-center text-sm font-medium text-gray-700">
        연결하기 <span className="ml-1">&gt;</span>
      </button>
    </>
  );

  const renderNotInitializedContent = () => (
    <>
      <h1 className="flex items-center text-2xl font-bold text-gray-50">
        {coupleInfo.userNickname} <img src={CoupleHeart} alt="하트" className="mx-2" />
        {coupleInfo.coupleNickname}
      </h1>
      <button
        onClick={handleInitialize}
        className="mt-2 flex items-center text-sm font-medium text-gray-700">
        초기 설정하기 <span className="ml-1">&gt;</span>
      </button>
    </>
  );

  const renderInitializedContent = () => (
    <h1 className="flex items-center text-2xl font-bold text-gray-50">
      {coupleInfo.userNickname} <img src={CoupleHeart} alt="하트" className="mx-2" />
      {coupleInfo.coupleNickname}
    </h1>
  );

  const renderContent = () => {
    if (!isConnected) return renderNotConnectedContent();
    if (!isInitialized) return renderNotInitializedContent();
    return renderInitializedContent();
  };

  return (
    <div className="relative h-[259px] overflow-hidden">
      <img src={getBackgroundImage()} alt="배경" className="h-full w-full object-cover" />
      <button className="absolute top-16 right-4">
        <img src={NotificationIcon} alt="알림" className="h-6 w-6" />
      </button>

      <div className="absolute top-16 left-4">
        {renderContent()}
      </div>
    </div>
  );
};
