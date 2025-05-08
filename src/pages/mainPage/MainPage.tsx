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

const NotConnectedPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <TopSection isConnected={false} isInitialized={false} />
      <div className="mt-6">
        <SpecialDateSection isConnected={false} isInitialized={false} />
      </div>
      <div className="relative z-10 -mt-13 flex-grow rounded-t-[20px] bg-gray-50">
        <main className="container mx-auto max-w-screen-lg px-4 pt-15 pb-[95px]">
          <div className="grid w-full gap-4">
            <StatusSection isConnected={false} isInitialized={false} />
            <ScheduleSection />
            <LetterSection />
            <DDaySection />
          </div>
        </main>
      </div>
      <div className="z-10 fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] bg-white">
        <NavBar />
      </div>
    </div>
  );
};

const NotInitializedPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <TopSection isConnected={true} isInitialized={false} />
      <div className="mt-6">
        <SpecialDateSection isConnected={true} isInitialized={false} />
      </div>
      <div className="relative z-10 -mt-13 flex-grow rounded-t-[20px] bg-gray-50">
        <main className="container mx-auto max-w-screen-lg px-4 pt-15 pb-[95px]">
          <div className="grid w-full gap-4">
            <StatusSection isConnected={true} isInitialized={false} />
            <ScheduleSection />
            <LetterSection />
            <DDaySection />
          </div>
        </main>
      </div>
      <div className="z-10 fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] bg-white">
        <NavBar />
      </div>
    </div>
  );
};

const InitializedPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <TopSection isConnected={true} isInitialized={true} />
      <div className="mt-6">
        <SpecialDateSection isConnected={true} isInitialized={true} />
      </div>
      <div className="relative z-10 -mt-13 flex-grow rounded-t-[20px] bg-gray-50">
        <main className="container mx-auto max-w-screen-lg px-4 pt-15 pb-[95px]">
          <div className="grid w-full gap-4">
            <StatusSection isConnected={true} isInitialized={true} />
            <ScheduleSection />
            <LetterSection />
            <DDaySection />
          </div>
        </main>
      </div>
      <div className="z-10 fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] bg-white">
        <NavBar />
      </div>
    </div>
  );
};

export const MainPage = () => {
  const { checkCoupleConnect } = useIscouple();
  const { getCoupleInfo } = useInitSettingQueries();
  const isConnected = checkCoupleConnect.data?.result ?? false;
  const isInitialized = getCoupleInfo.data?.result.isAnniversariesRegistered ?? false;

  if (!isConnected) {
    return <NotConnectedPage />;
  }

  if (!isInitialized) {
    return <NotInitializedPage />;
  }

  return <InitializedPage />;
};
