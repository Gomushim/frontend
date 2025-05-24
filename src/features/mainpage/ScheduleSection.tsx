import { Suspense } from "react";
import { MainScheduleCardList, MiniCalendar } from "../schedule";
import { ErrorBoundary } from "react-error-boundary";
import { MainHeader } from "./ui/MainHeader";
import { SelectedDateProvider } from "../schedule/context/SelectedDateContext";

export const ScheduleSection = () => {
  return (
    <SelectedDateProvider>
      <MainHeader mainTitle="우리의 일정" onClick={() => console.log("일정 더보기")} />
      <section className="mx-auto w-full max-w-md rounded-2xl bg-white py-4">
        <ErrorBoundary fallback={<div>에러 발생</div>}>
          <Suspense fallback={<div>로딩중</div>}>
            <MiniCalendar />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={<div>에러 발생</div>}>
          <Suspense fallback={<div>로딩중...</div>}>
            <MainScheduleCardList />
          </Suspense>
        </ErrorBoundary>
      </section>
    </SelectedDateProvider>
  );
};
