import { Suspense } from "react";
import { MiniCalendar } from "../schedule";
import { MainHeader } from "./utils/MainHeader";

import { ScheduleCardList } from "../schedule/widgets/ScheduleCardList";

export const ScheduleSection = () => {
  return (
    <>
      <MainHeader mainTitle="우리의 일정" onClick={() => console.log("일정 더보기")} />
      <section className="mx-auto max-w-md rounded-2xl bg-white p-4">
        <Suspense fallback={<div>로딩중</div>}>
          <MiniCalendar />
        </Suspense>
        <Suspense fallback={<div>로딩중...</div>}>
          <ScheduleCardList />
        </Suspense>
      </section>
    </>
  );
};
