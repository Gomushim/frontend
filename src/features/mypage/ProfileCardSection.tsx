import profileImage from "@/assets/images/profile_image.svg";
import nextArrow from "@/assets/images/next_arrow.svg";
import { useMyInfo } from "@/entities/mypage_info";
import { useNavigate } from "react-router";

export const ProfileCardSection = () => {
  const { data: myInfoData } = useMyInfo();
  const nickname = myInfoData?.result.nickname;
  const navigate = useNavigate();

  return (
    <div
      className={"bg-gray-50 rounded-lg p-4 flex items-center justify-between "}
      onClick={() =>navigate("/mypage/profileinfo")}
    >
      <div className="w-8 h-8 font-medium text-md text-gray-900 mr-3 ">
        <img src={profileImage} alt="프로필" className="w-8 h-8 object-cover" />
      </div>
      <div className="flex-1 text-base font-medium text-gray-900">{nickname || "사용자"}</div>
      <img src={nextArrow} alt="다음" className="w-4 h-4" />
    </div>
  );
}; 