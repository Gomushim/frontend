import { Suspense } from "react";
import { MainScheduleCardList, MiniCalendar } from "../schedule";
import { MainHeader } from "./utils/MainHeader";

export const ScheduleSection = () => {
  return (
    <>
      <MainHeader mainTitle="우리의 일정" onClick={() => console.log("일정 더보기")} />
      <section className="mx-auto w-full max-w-md rounded-2xl bg-white py-4">
        <Suspense fallback={<div>로딩중</div>}>
          <MiniCalendar />
        </Suspense>
        <Suspense fallback={<div>로딩중...</div>}>
          <MainScheduleCardList />
        </Suspense>
      </section>
    </>
  );
};
