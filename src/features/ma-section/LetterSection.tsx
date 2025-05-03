import { MainHeader } from "./utils/MainHeader";
import LetterIcon from "@/assets/images/letter.svg";
import LetterGreenIcon from "@/assets/images/letter_green.svg";
import { useGetLetterListMain } from "@/entities/my_letter/queries";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export const LetterSection = () => {
  const { data: letterList } = useGetLetterListMain();

  if (!letterList?.result || letterList.result.length === 0) {
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
  }

  return (
    <>
      <MainHeader mainTitle="도착한 편지" buttonText="더보기" onClick={() => console.log("도착한 편지 더보기")} />
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {letterList.result.map((letter) => (
            <div key={letter.letterId} className="flex-none h-[140px] w-[190px] flex-col gap-2.5 rounded-2xl bg-white p-4">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1">
                    <img src={LetterGreenIcon} alt="편지" className="h-5 w-5" />
                    <span className="text-md font-semibold text-gray-900">
                      {letter.title.length > 9 ? `${letter.title.slice(0, 9)}...` : letter.title}
                    </span>
                  </div>  
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500 font-medium">{letter.content}</p>
                </div>
                <span className="text-xs font-regular text-gray-500 text-right">
                  {formatDate(letter.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
