import NotificationIcon from "@/assets/images/notification.svg";
import InitBg from "@/assets/images/initbg.svg";
import ArmyBg from "@/assets/images/armybg.svg";
import NavyBg from "@/assets/images/navybg.svg";
import AirBg from "@/assets/images/airbg.svg";
import CoupleHeart from "@/assets/images/couple_heart.svg";
import { useNavigate } from "react-router";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useUserStore } from "@/store/userStore";

interface TopSectionProps {
  isConnected: boolean;
  coupleInfo: {
    userNickname: string;
    coupleNickname: string;
  };
}

export const TopSection = ({ isConnected, coupleInfo }: TopSectionProps) => {
  const navigate = useNavigate();
  const { militaryBranch } = useOnboardingStore();
  const { isInitialized } = useUserStore();

  const getBackgroundImage = () => {
    if (!isConnected) return InitBg;
    
    switch (militaryBranch) {
      case 'ARMY':
        return ArmyBg;
      case 'NAVY':
        return NavyBg;
      case 'AIR_FORCE':
        return AirBg;
      default:
        return InitBg;
    }
  };

  return (
    <div className="relative h-[259px] overflow-hidden">
      {/* 배경 이미지 */}
      <img src={getBackgroundImage()} alt="배경" className="w-full h-full object-cover" />
      {/* 알림 버튼 */}
      <button className="absolute top-16 right-4">
        <img src={NotificationIcon} alt="알림" className="w-6 h-6" />
      </button>
     
      <div className="absolute top-16 left-4">
        {/* 커플 연결 x */}
        {!isConnected ? (
          <>
            <h1 className="text-2xl font-bold text-gray-50">커플 연결이<br />필요해요</h1>
            <button 
              onClick={() => navigate('/onboarding/couple-contact')}
              className="mt-2 text-sm font-medium text-gray-700 flex items-center"
            >
              연결하기 <span className="ml-1">&gt;</span>
            </button>
          </>
        /* 커플 연결 o 초기설정 x*/
        ) : !isInitialized ? (
          <>
             <h1 className="text-2xl font-bold text-gray-50 flex items-center">
              {coupleInfo.userNickname} <img src={CoupleHeart} alt="하트" className="mx-2" /> 
              {coupleInfo.coupleNickname}
            </h1>            <button 
              onClick={() => navigate('/onboarding/firstmeet')}
              className="mt-2 text-sm font-medium text-gray-700 flex items-center"
            >
              초기 설정하기 <span className="ml-1">&gt;</span>
            </button>
          </>
        ) : (
          /* 커플 연결 o 초기설정 */
          <> 
            <h1 className="text-2xl font-bold text-gray-50 flex items-center">
              {coupleInfo.userNickname} <img src={CoupleHeart} alt="하트" className="mx-2" /> 
              {coupleInfo.coupleNickname}
            </h1>
          </>
        )}
      </div>
    </div>
  );
};
