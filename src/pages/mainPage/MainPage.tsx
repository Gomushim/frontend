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

export const MainPage = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkCoupleStatus = async () => {
      try {
        const response = await iscoupleQueries.checkCoupleConnect();
        setIsConnected(response.result);
      } catch (error) {
        console.error("커플 상태 조회 실패:", error);
        setIsConnected(false);
      }
    };

    checkCoupleStatus();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 상단 배경 */}
      <TopSection isConnected={isConnected} />

      {/* 상단 디데이 */}
      <SpecialDateSection />
      {/* 메인 컨텐츠 */}
      <div className="relative z-10 -mt-12 flex-grow rounded-t-[20px] bg-gray-50">
        <main className="container mx-auto max-w-screen-lg px-4 pt-15 pb-[95px]">
          <div className="grid w-full gap-4">
            <StatusSection isConnected={isConnected} />
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
