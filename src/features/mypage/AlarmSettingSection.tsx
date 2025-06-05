import nextArrow from "@/assets/images/next_arrow.svg";
import { useNavigate } from "react-router";
import { useInitSettingQueries } from "@/entities/init_setting";
import { useIscouple } from "@/entities/iscouple";

export const NotificationSetting = () => {
  const navigate = useNavigate();
  const { getCoupleInfo } = useInitSettingQueries();
  const { checkCoupleConnect } = useIscouple();
  
  const isConnected = checkCoupleConnect.data?.result ?? false;
  const isInitialized = getCoupleInfo.data?.result.isAnniversariesRegistered ?? false;

  return (
    <div 
    onClick={() => isConnected && isInitialized && navigate("/mypage/alarmsetting")}
    className={`bg-gray-50 rounded-lg p-4 font-medium text-md text-gray-900 flex items-center justify-between ${(!isConnected || !isInitialized) ? "cursor-not-allowed" : "cursor-pointer"}`}>
      <span>알림 설정</span>
      <img src={nextArrow} alt="다음" className="w-4 h-4" />
    </div>
  );
}; 