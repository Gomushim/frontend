import NotificationIcon from "@/assets/images/notification.svg";
import InitBg from "@/assets/images/initbg.svg";
import ArmyBg from "@/assets/images/armybg.svg";
import NavyBg from "@/assets/images/navybg.svg";
import AirBg from "@/assets/images/airbg.svg";
import CoupleHeart from "@/assets/images/couple_heart.svg";
import { useNavigate } from "react-router";
import { useOnboardingStore } from "@/stores/maonboardingStore";
import { useCoupleStore } from "@/stores/coupleStore";
import { useEffect, useState } from "react";
import { maonboardingQueries } from "@/entities/maonboarding/service";

export const TopSection: React.FC = () => {
  const navigate = useNavigate();
  const { militaryBranch } = useOnboardingStore();
  const { isConnected, isInitialized, coupleInfo, isLoading, fetchCoupleStatus, fetchCoupleNicknames, setInitialized } = useCoupleStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeCoupleData = async () => {
      await fetchCoupleStatus();
      if (isConnected) {
        await fetchCoupleNicknames();
      }
    };

    initializeCoupleData();
  }, [fetchCoupleStatus, fetchCoupleNicknames, isConnected]);

  const handleInitialize = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      setInitialized(true);
      navigate("/onboarding/firstmeet");
    } catch (error) {
      console.error("초기화 중 오류 발생:", error);
      setError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            onClick={handleInitialize}
            disabled={isSubmitting}
            className="mt-2 flex items-center text-sm font-medium text-gray-700">
            {isSubmitting ? "처리중..." : "초기 설정하기"} <span className="ml-1">&gt;</span>
          </button>
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
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
