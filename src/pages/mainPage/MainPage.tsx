import { NavBar } from "@/shared/ui";
import {
  StatusSection,
  ScheduleSection,
  LetterSection,
  DDaySection,
  SpecialDateSection,
  TopSection,
} from "@/features/mainpage";
import { useInitSettingQueries } from "@/entities/init_setting";
import { useIscouple } from "@/entities/iscouple";

export const MainPage = () => {
  const { checkCoupleConnect } = useIscouple();
  const { getCoupleInfo } = useInitSettingQueries();
  const isConnected = checkCoupleConnect.data?.result ?? false;
  const isInitialized = getCoupleInfo.data?.result.isAnniversariesRegistered ?? false;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 상단 배경 */}
      <TopSection isConnected={isConnected} isInitialized={isInitialized} />

      {/* 상단 디데이 */}
      <SpecialDateSection isConnected={isConnected} isInitialized={isInitialized} />
      {/* 메인 컨텐츠 */}
      <div className="relative z-10 -mt-12 flex-grow rounded-t-[20px] bg-gray-50">
        <main className="container mx-auto max-w-screen-lg px-4 pt-15 pb-[95px]">
          <div className="grid w-full gap-4">
            <StatusSection isConnected={isConnected} isInitialized={isInitialized} />
            <ScheduleSection  />
            <LetterSection  />
            <DDaySection />
          </div>
        </main>
      </div>
      {/* 네비게이션 바 */}
      <div className="z-10 fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] bg-white">
        <NavBar />
      </div>
    </div>
  );
};
