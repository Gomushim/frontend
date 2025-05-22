import profileImage from "@/assets/images/profile_image.svg";
import nextArrow from "@/assets/images/next_arrow.svg";
import { useMyInfo } from "@/entities/mypage_info";
import { useNavigate } from "react-router";
import { useInitSettingQueries } from "@/entities/init_setting";
import { useIscouple } from "@/entities/iscouple";

export const ProfileCardSection = () => {
  const { data: myInfoData } = useMyInfo();
  const { getCoupleInfo } = useInitSettingQueries();
  const { checkCoupleConnect } = useIscouple();
  const nickname = myInfoData?.result.nickname;
  const navigate = useNavigate();

  const isConnected = checkCoupleConnect.data?.result ?? false;
  const isInitialized = getCoupleInfo.data?.result.isAnniversariesRegistered ?? false;

  return (
    <div
      className={`bg-gray-50 rounded-lg p-4 flex items-center justify-between ${(!isConnected || !isInitialized) ? " cursor-not-allowed" : "cursor-pointer"}`}
      onClick={() => isConnected && isInitialized && navigate("/mypage/profileinfo")}
    >
      <div className="w-8 h-8 font-medium text-md text-gray-900 mr-3 ">
        <img src={profileImage} alt="프로필" className="w-8 h-8 object-cover" />
      </div>
      <div className="flex-1 text-base font-medium text-gray-900">{nickname || "사용자"}</div>
      <img src={nextArrow} alt="다음" className="w-4 h-4" />
    </div>
  );
}; 