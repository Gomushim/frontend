import { NavBar } from "@/shared/ui";
import {
  StatusSection,
  ScheduleSection,
  LetterSection,
  DDaySection,
  IconSection,
  TopSection,
} from "@/features/ma-section";

export const MainPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 상단 배경 */}
      <TopSection />

      {/* 상단 디데이 */}
      <IconSection />
      {/* 메인 컨텐츠 */}
      <div className="relative z-10 -mt-12 flex-grow rounded-t-[20px] bg-gray-50">
        <main className="container mx-auto max-w-screen-lg px-4 pt-15 pb-[95px]">
          <div className="grid w-full gap-4">
            <StatusSection />
            <ScheduleSection />
            <LetterSection />
            <DDaySection />
          </div>
        </main>
      </div>
      {/* 네비게이션 바 */}
      <div className="z-50 bg-white">
        <NavBar />
      </div>
    </div>
  );
};
