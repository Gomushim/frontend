import { Calendar } from "@/features/schedule/widgets";
import { ScheduleCardList } from "@/features/schedule/widgets/ScheduleCardList";
import { NavBar } from "@/shared/ui";
import { Suspense } from "react";

export const CalendarRoot = () => {
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <Calendar />
      </Suspense>
      <div className="mt-7 flex min-h-[500px] w-full flex-col gap-3 bg-gray-50 p-5">
        <Suspense fallback={<div>로딩중...</div>}>
          <ScheduleCardList />
        </Suspense>
      </div>
      <div className="fixed bottom-0 left-1/2 z-10 w-[375px] -translate-x-1/2 bg-white">
        <NavBar />
      </div>
    </>
  );
};
