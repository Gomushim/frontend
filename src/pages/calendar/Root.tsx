// 도메인: schedule
import { Calendar } from "@/features/schedule/ui";
import { ScheduleCardList } from "@/features/schedule/ui/ScheduleCardList";
import { SelectedDateProvider } from "@/features/schedule/context/SelectedDateContext";

// UI
import { NavBar } from "@/widgets/navbar/ui";

// 외부 라이브러리
import { Suspense } from "react";

export const CalendarRoot = () => {
  return (
    <SelectedDateProvider>
      {/* 캘린더 영역 */}
      <Suspense fallback={<div>로딩중...</div>}>
        <Calendar />
      </Suspense>

      {/* 일정 리스트 영역 */}
      <div className="mt-7 flex min-h-[500px] w-full flex-col gap-3 bg-gray-50 p-5 pb-30">
        <Suspense fallback={<div>로딩중...</div>}>
          <ScheduleCardList />
        </Suspense>
      </div>

      {/* 네비게이션 바 */}
      <div className="pc:w-[375px] fixed bottom-0 left-1/2 z-10 w-full -translate-x-1/2 bg-white">
        <NavBar />
      </div>
    </SelectedDateProvider>
  );
};
