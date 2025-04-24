import CharacterDefaultIcon from "@/assets/images/character_default.svg";
import {MainHeader} from "./MainHeader";
import { useNavigate } from "react-router";
import { useOnboardingStore } from "@/store/onboardingStore";

interface StatusSectionProps {
  isConnected: boolean;
}

export const StatusSection = ({ isConnected }: StatusSectionProps) => {
  const navigate = useNavigate();
  const { militaryBranch } = useOnboardingStore();

  const handleStatusClick = () => {
    if (militaryBranch) {
      navigate('/status');
    }
  };

  return (
    <>
      <MainHeader 
        mainTitle="연인의 상태 메세지" 
        buttonText="상태 메세지 쓰러가기" 
        onClick={handleStatusClick}
        disabled={!militaryBranch}
      />
      <section className="bg-white rounded-2xl p-6 mb-4">
        <div className="flex items-center font-semibold text-sm text-gray-500">
          <img src={CharacterDefaultIcon} alt="캐릭터" className="w-5 h-5 mr-2 opacity-50" />
          <span>{isConnected ? "오늘 기분은 어떤가요?" : "커플 연결을 해주세요."}</span>
        </div>
      </section>
    </>
  );
};
