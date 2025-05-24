import { MainHeader } from "./ui/MainHeader";
import LetterIcon from "@/assets/images/letter.svg";
import LetterGreenIcon from "@/assets/images/letter_green.svg";
import { useGetLetterListMain } from "@/entities/main_letter/queries";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui";
import { formatDateDot } from "@/shared/utils/date/formatdate";
import { useNavigate } from "react-router";

interface LetterSectionProps {
  isConnected: boolean;
  isInitialized: boolean;
}

export const LetterSection = ({ isConnected, isInitialized }: LetterSectionProps) => {
  const enabled = isConnected || isInitialized;
  const { data: letterList } = useGetLetterListMain(enabled);
  const navigate = useNavigate();

 

  if (!isConnected || !isInitialized||!letterList?.result || letterList.result.length === 0) {
    return (
      <>
        <MainHeader mainTitle="도착한 편지" buttonText="더보기" onClick={() => {}} />
        <div className="flex h-[140px] w-[190px] flex-col gap-2.5 rounded-2xl bg-white p-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <img src={LetterIcon} alt="편지" className="h-6 w-6" />
              <span className="text-md font-semibold text-gray-900">나의 마음 전하기</span>
            </div>
            <span className="mt-1 text-sm font-medium text-gray-500">
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
      <MainHeader mainTitle="도착한 편지" buttonText="더보기" onClick={() => navigate("/calendar/letters")} />
      <div className="relative w-full overflow-x-auto">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            dragFree: true,
          }}
          className="w-full">
          <CarouselContent className="-ml-4 gap-3">
            {letterList.result.map(letter => (
              <CarouselItem key={letter.letterId} className="basis-[190px] pl-4">
                <div className="h-[140px] w-[190px] flex-col gap-2.5 rounded-2xl bg-white p-4">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1">
                        <img src={LetterGreenIcon} alt="편지" className="h-5 w-5" />
                        <span className="text-md font-semibold text-gray-900">
                          {letter.title.length > 9 ? `${letter.title.slice(0, 9)}...` : letter.title}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm font-medium text-gray-500">{letter.content}</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-regular text-xs text-gray-500">
                        {formatDateDot(new Date(letter.title))}
                      </span>
                      <span className="font-regular text-xs text-gray-500">
                        {formatDateDot(new Date(letter.createdAt))}
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};
