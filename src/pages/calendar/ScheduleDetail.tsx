import { NoLetterMessage } from "@/features/letter/widgets/NoLetterMessage";
import { ScheduleOverView } from "@/features/schedule";
import { Button } from "@/shared/ui";
import letterIcon from "@/assets/icons/letter.svg";

const dummySchedule = {
  fatigue: "VERY_TIRED",
  title: "KCTC 훈련",
  startDateTime: new Date("2025-06-05T22:00:00"),
  endDateTime: new Date("2025-06-05T22:00:00"),

  letter: [
    {
      id: 1,
      title: "테스트",
      imageUrl: "string",
      creationDate: new Date("2025-06-05T22:00:00"),
    },
    {
      id: 2,
      title: "테스트",
      imageUrl: "string",
      creationDate: new Date("2025-06-05T22:00:00"),
    },
  ],
};

export const CalendarScheduleDetail = () => {
  const { letter, ...rest } = dummySchedule;

  return (
    <>
      <div className="px-[22px]">
        <header>헤더</header>
        <ScheduleOverView {...rest} />
      </div>
      <main>
        <section className="mt-6 h-[calc(100vh-296px)] bg-gray-50 px-[22px] pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img className="pb-1" src={letterIcon} alt="편지" />
              <h2 className="text-xl font-semibold text-gray-900">작성된 편지</h2>
              <p className="text-md font-semibold text-gray-500">0</p>
            </div>
            <Button variant="square" size="2xs">
              편지 작성하기
            </Button>
          </div>
          <NoLetterMessage />
        </section>
      </main>
    </>
  );
};
