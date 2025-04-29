import { ScheduleOverView } from "@/features/schedule";
import { Button } from "@/shared/ui";
import letterIcon from "@/assets/icons/letter.svg";
import backIcon from "@/assets/icons/back.svg";
import gearIcon from "@/assets/icons/gear.svg";
import { LetterList, WriteLetterBottomSheet } from "@/features/letter";

const dummySchedule = {
  fatigue: "VERY_TIRED",
  title: "KCTC 훈련",
  startDateTime: new Date("2025-06-05T22:00:00"),
  endDateTime: new Date("2025-06-05T22:00:00"),
  totalCount: 5,
  letter: [
    {
      id: 4,
      title: "테스트",
      content: "테스트",
      imageUrl: letterIcon,
      creationDate: new Date("2025-06-05T22:00:00"),
    },
  ],
};

export const CalendarScheduleDetail = () => {
  const { letter, totalCount, ...rest } = dummySchedule;
  return (
    <>
      <div className="px-[22px]">
        <header className="mt-[70px] mb-4 flex items-center justify-between">
          <Button variant="ghost" size="xs" className="">
            <img src={backIcon} alt="뒤로가기" />
          </Button>
          <h1 className="">일정 세부사항</h1>
          <Button variant="ghost" size="xs" className="">
            <img src={gearIcon} alt="일정 세부사항 설정" />
          </Button>
        </header>
        <ScheduleOverView {...rest} />
      </div>
      <main>
        <section className="mt-6 bg-gray-50 px-[22px] py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img className="pb-1" src={letterIcon} alt="편지" />
              <h2 className="text-xl font-semibold text-gray-900">작성된 편지</h2>
              <p className="text-md font-semibold text-gray-500">{totalCount}</p>
            </div>
            <WriteLetterBottomSheet />
          </div>
          <LetterList letters={letter} />
          {/* <NoLetterMessage /> */}
        </section>
      </main>
    </>
  );
};
