import { NavBar } from "@/shared/ui";
import { StatusSection, ScheduleSection, LetterSection, DDaySection, IconSection, TopSection } from "@/features/ma-section";
import { useCoupleStore } from "@/store/coupleStore";

export const MainPage = () => {
  const { isConnected } = useCoupleStore();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 상단 배경 */}
      <TopSection />
      {/* 상단 디데이 */}
      <IconSection />
      {/* 메인 컨텐츠 */}
      <div className="bg-gray-50 -mt-12 rounded-t-[20px] relative z-10 flex-grow">
        <main className="container mx-auto px-4 pt-15 pb-[95px] max-w-screen-lg">
          <div className="grid gap-4 w-full">
            <StatusSection isConnected={isConnected} />
            <ScheduleSection />
            <LetterSection />
            <DDaySection />
          </div>
        </main>
      </div>
      {/* 네비게이션 바 */}
      <div className="bg-white z-50">
        <NavBar />
      </div>
    </div>
  );
};
