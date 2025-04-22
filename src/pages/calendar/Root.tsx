import { useState } from "react";
import { Calendar, DdayCard, LetterCard, ScheduleCard } from "@/components/calendar";
import { StatusCard } from "@/components/calendar/StatusCard";

const schedultestData = {
  schedule: "KCTC 훈련",
  tag: "매우 피곤해요",
  time: "하루종일",
  barColor: "#1B604B",
};

const ddayCard = {
  schedule: "윤병현의 생일",
  iconSrc: "src/assets/icons/cake.svg",
  date: "2025.06.05",
  remainingDays: "D-day",
};

const letterCard = {
  contents: "힘든 훈련을 하고 있을 당신에게",
  date: new Date(),
};

const apiStatusCards = [
  { id: 1, status: "매우 피곤해요" },
  { id: 2, status: "조금 피곤해요" },
  { id: 3, status: "괜찮아요" },
];

export const CalendarRoot: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 선택된 카드 id 상태 (단일 선택)
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleStatusCardClick = (id: number) => {
    setSelectedId(id);
  };

  const initialDate = new Date();

  return (
    <div className="p-5">
      <Calendar initialDate={initialDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <div className="flex flex-col gap-2 bg-gray-50 pt-5">
        <ScheduleCard {...schedultestData} />
        <DdayCard {...ddayCard} />
        <LetterCard {...letterCard} />

        {apiStatusCards.map(({ id, status }) => (
          <StatusCard key={id} status={status} selected={selectedId === id} onClick={() => handleStatusCardClick(id)} />
        ))}
      </div>
    </div>
  );
};
