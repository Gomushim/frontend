import { Suspense } from "react";
import { MainScheduleCardList, MiniCalendar, SimpleCalendar } from "../schedule";
import { ErrorBoundary } from "react-error-boundary";
import { MainHeader } from "./ui/MainHeader";
import { SelectedDateProvider } from "../schedule/context/SelectedDateContext";
import { useNavigate } from "react-router";
import CalendarBlack from "@/assets/images/calendar_black.svg";

interface ScheduleSectionProps {
  isConnected: boolean;
  isInitialized: boolean;
}

export const ScheduleSection = ({ isConnected, isInitialized }: ScheduleSectionProps) => {
  const navigate = useNavigate();

  const hadleMoveCalendar = () => {
    navigate("/calendar/schedule");
  };

  return (
    <SelectedDateProvider>
      <MainHeader
        mainTitle="우리의 일정"
        onClick={hadleMoveCalendar}
        isConnected={isConnected}
        isInitialized={isInitialized}
      />
      <section className="mx-auto w-full max-w-md rounded-2xl bg-white px-4 py-4">
        <ErrorBoundary fallback={<SimpleCalendar />}>
          <Suspense fallback={<div>로딩중</div>}>
            <MiniCalendar isConnected={isConnected} isInitialized={isInitialized} />
          </Suspense>
        </ErrorBoundary>
        {isConnected && isInitialized ? (
          <ErrorBoundary fallback={<div>에러 발생</div>}>
            <Suspense fallback={<div>로딩중...</div>}>
              <MainScheduleCardList />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <div className="flex w-full max-w-md items-center justify-start gap-1 rounded-2xl bg-gray-50 px-4 py-6">
            <img className="h-5 w-5" src={CalendarBlack} alt="캘린더 아이콘" />
            <p className="text-md font-medium text-gray-500">서로의 일정을 공유해보세요.</p>
          </div>
        )}
      </section>
    </SelectedDateProvider>
  );
};
