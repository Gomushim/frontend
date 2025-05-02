import { DdayList } from "@/features/d-day/widgets";
import { Button } from "@/shared/ui";
import backIcon from "@/assets/icons/back.svg";

const dummyData: {
  author: string[];
  totalCount: number;
  data: {
    id: number;
    emoji: "HEART" | "CALENDAR" | "CAKE" | "TRAVEL";
    title: string;
    anniversaryDate: string;
  }[];
} = {
  author: ["세린", "산들"],
  totalCount: 5,
  data: [
    {
      id: 1,
      emoji: "HEART",
      title: "생일 파티",
      anniversaryDate: "2025-06-05",
    },
    {
      id: 2,
      emoji: "TRAVEL",
      title: "여행 준비",
      anniversaryDate: "2025-06-05",
    },
    {
      id: 3,
      emoji: "CALENDAR",
      title: "회의 일정",
      anniversaryDate: "2025-06-05",
    },
    {
      id: 4,
      emoji: "HEART",
      title: "기념일",
      anniversaryDate: "2025-06-05",
    },
    {
      id: 5,
      emoji: "CAKE",
      title: "대회 참가",
      anniversaryDate: "2025-06-05",
    },
  ],
};

export const CalendarDdayList = () => {
  return (
    <div className="px-[22px]">
      <header className="relative flex items-center justify-center">
        <Button variant="ghost" size="sIcon" className="absolute top-[60px] left-0">
          <img src={backIcon} alt="뒤로가기" />
        </Button>
        <h1 className="pt-[70px] pb-2.5">디데이</h1>
      </header>
      <main>
        <DdayList {...dummyData} />
      </main>
    </div>
  );
};
