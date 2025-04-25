import { ScheduleOverView } from "@/features/schedule";

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
    <div className="p-[22px]">
      <header>헤더</header>
      <main>
        <ScheduleOverView {...rest} />
      </main>
    </div>
  );
};
