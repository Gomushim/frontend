import { NavBar } from "@/shared/ui";
import {
  StatusSection,
  ScheduleSection,
  LetterSection,
  DDaySection,
  SpecialDateSection,
  TopSection,
} from "@/features/ma-section";
import { useEffect, useState } from "react";
import { iscoupleQueries } from "@/entities/iscouple/service";
import { maonboardingQueries } from "@/entities/maonboarding/service";

export const MainPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const checkInitialStatus = async () => {
      try {
        const [coupleResponse, coupleInfoResponse] = await Promise.all([
          iscoupleQueries.checkCoupleConnect(),
          maonboardingQueries.getCoupleInfo()
        ]);
        setIsConnected(coupleResponse.result);
        setIsInitialized(coupleInfoResponse.result.isAnniversariesRegistered);
      } catch (error) {
        console.error("상태 조회 실패:", error);
        setIsConnected(false);
        setIsInitialized(false);
      }
    };

    checkInitialStatus();
  }, []);

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
