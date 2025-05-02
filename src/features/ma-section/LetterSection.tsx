import { MainHeader } from "./utils/MainHeader";
import LetterIcon from "@/assets/images/letter.svg";
import { useGetLetterListToMe } from "@/entities/my_letter/queries";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}.${day}`;
};

export const LetterSection = () => {
  const { data: letterList } = useGetLetterListToMe({ take: 1 });
  const latestLetter = letterList?.result.data[0];

  if (!latestLetter) {
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
      <div className="mb-4 flex h-[140px] w-[190px] flex-col gap-2.5 rounded-2xl bg-white p-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <img src={LetterIcon} alt="편지" className="h-5 w-5" />
            <span className="text-sm font-semibold text-gray-900">{latestLetter.title}</span>
          </div>
          <span className="mt-1 text-xs font-medium text-gray-500">
            {formatDate(latestLetter.createdAt)}
          </span>
          <p className="mt-2 line-clamp-2 text-xs text-gray-900">{latestLetter.content}</p>
        </div>
      </div>
    </>
  );
};
