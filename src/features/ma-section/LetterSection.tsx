import { MainHeader } from "./MainHeader";
import LetterIcon from "@/assets/images/letter.svg";

export const LetterSection = () => {
  return (
    <>
      <MainHeader mainTitle="도착한 편지" buttonText="더보기" onClick={() => console.log("도착한 편지 더보기")} />
      <div className="mb-4 flex h-[140px] w-[190px] flex-col gap-2.5 rounded-2xl bg-white p-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <img src={LetterIcon} alt="편지" className="h-5 w-5" />
            <span className="text-sm font-semibold text-gray-900">나의 마음 전하기</span>
          </div>
          <span className="mt-1 text-xs font-medium text-gray-500">
            오늘 연인의 일정에
            <br />
            따뜻한 격려 어때요?
          </span>
        </div>
      </div>
    </>
  );
};
