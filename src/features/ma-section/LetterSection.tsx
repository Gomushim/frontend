import {MainHeader} from "./MainHeader";
import LetterIcon from "@/assets/images/letter.svg";

export const LetterSection = () => {
  return (
    <>
      <MainHeader 
        mainTitle="도착한 편지" 
        buttonText="더보기"
        onClick={() => console.log('도착한 편지 더보기')}
      />
      <div className="w-[190px] h-[140px] bg-white rounded-2xl p-4 mb-4 flex flex-col gap-2.5">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <img src={LetterIcon} alt="편지" className="w-5 h-5" />
            <span className="text-gray-900 text-sm font-semibold">나의 마음 전하기</span>
          </div>
          <span className="text-gray-500 text-xs font-medium mt-1">오늘 연인의 일정에<br />따뜻한 격려 어때요?</span>
        </div>
      </div>
    </>
  );
};
