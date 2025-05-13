import { Calendar } from "@/features/schedule/ui";
import { ScheduleCardList } from "@/features/schedule/ui/ScheduleCardList";
import { NavBar } from "@/widgets/navbar/ui";
import { SelectedDateProvider } from "@/features/schedule/context/SelectedDateContext";
import { Suspense } from "react";

export const CalendarRoot = () => {
  return (
    <SelectedDateProvider>
      <Suspense fallback={<div>로딩중...</div>}>
        <Calendar />
      </Suspense>
      <div className="mt-7 flex min-h-[500px] w-full flex-col gap-3 bg-gray-50 p-5 pb-30">
        <Suspense fallback={<div>로딩중...</div>}>
          <ScheduleCardList />
        </Suspense>
      </div>
      <div className="fixed bottom-0 left-1/2 z-10 w-[375px] -translate-x-1/2 bg-white">
        <NavBar />
      </div>
    </SelectedDateProvider>
  );
};
