import NotificationIcon from "@/assets/images/notification.svg";
import InitBg from "@/assets/images/initbg.svg";
import ArmyBg from "@/assets/images/armybg.svg";
import NavyBg from "@/assets/images/navybg.svg";
import AirBg from "@/assets/images/airbg.svg";
import CoupleHeart from "@/assets/images/couple_heart.svg";
import { useNavigate } from "react-router";
import { useOnboardingStore } from "@/stores/maonboardingStore";
import { useCoupleStore } from "@/stores/coupleStore";
import { useEffect } from "react";

export const TopSection: React.FC = () => {
  const navigate = useNavigate();
  const { militaryBranch } = useOnboardingStore();
  const { isConnected, isInitialized, coupleInfo, isLoading, fetchCoupleStatus, fetchCoupleNicknames } = useCoupleStore();

  useEffect(() => {
    const initializeCoupleData = async () => {
      await fetchCoupleStatus();
      if (isConnected) {
        await fetchCoupleNicknames();
      }
    };

    initializeCoupleData();
  }, [fetchCoupleStatus, fetchCoupleNicknames, isConnected]);

  const getBackgroundImage = () => {
    if (!isConnected || !isInitialized) return InitBg;

    switch (militaryBranch) {
      case "ARMY":
        return ArmyBg;
      case "NAVY":
        return NavyBg;
      case "AIR_FORCE":
        return AirBg;
      default:
        return InitBg;
    }
  };

  const renderContent = () => {
    if (!isConnected) {
      return (
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
    }

    if (!isInitialized) {
      return (
        <>
          <h1 className="flex items-center text-2xl font-bold text-gray-50">
            {isLoading ? (
              "로딩중..."
            ) : (
              <>
                {coupleInfo.userNickname} <img src={CoupleHeart} alt="하트" className="mx-2" />
                {coupleInfo.coupleNickname}
              </>
            )}
          </h1>
          <button
            onClick={() => navigate("/onboarding/firstmeet")}
            className="mt-2 flex items-center text-sm font-medium text-gray-700">
            초기 설정하기 <span className="ml-1">&gt;</span>
          </button>
        </>
      );
    }

    return (
      <h1 className="flex items-center text-2xl font-bold text-gray-50">
        {isLoading ? (
          "로딩중..."
        ) : (
          <>
            {coupleInfo.userNickname} <img src={CoupleHeart} alt="하트" className="mx-2" />
            {coupleInfo.coupleNickname}
          </>
        )}
      </h1>
    );
  };

  return (
    <div className="relative h-[259px] overflow-hidden">
      {/* 배경 이미지 */}
      <img src={getBackgroundImage()} alt="배경" className="h-full w-full object-cover" />
      {/* 알림 버튼 */}
      <button className="absolute top-16 right-4">
        <img src={NotificationIcon} alt="알림" className="h-6 w-6" />
      </button>

      <div className="absolute top-16 left-4">
        {renderContent()}
      </div>
    </div>
  );
};
