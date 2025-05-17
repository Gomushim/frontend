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
import { NavBar } from "@/widgets/navbar/ui";

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
            <LetterSection isConnected={false} isInitialized={false} />
            <DDaySection isConnected={false} />
          </div>
        </main>
      </div>
      <div className="fixed bottom-0 left-1/2 z-10 w-[375px] -translate-x-1/2 bg-white">
        <NavBar />
      </div>
    </div>
  );
};

const NotInitializedPage = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <TopSection isConnected={true} isInitialized={false} isLoading={isLoading} />
      <div className="mt-6">
        <SpecialDateSection isConnected={true} isInitialized={false} isLoading={isLoading} />
      </div>
      <div className="relative z-10 -mt-13 flex-grow rounded-t-[20px] bg-gray-50">
        <main className="container mx-auto max-w-screen-lg px-4 pt-15 pb-[95px]">
          <div className="grid w-full gap-4">
            <StatusSection isConnected={true} isInitialized={false} />
            <ScheduleSection />
            <LetterSection isConnected={true} isInitialized={false} />
            <DDaySection isConnected={false} />
          </div>
        </main>
      </div>
      <div className="fixed bottom-0 left-1/2 z-10 w-[375px] -translate-x-1/2 bg-white">
        <NavBar />
      </div>
    </div>
  );
};

const InitializedPage = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <TopSection isConnected={true} isInitialized={true} isLoading={isLoading} />
      <div className="mt-6">
        <SpecialDateSection isConnected={true} isInitialized={true} isLoading={isLoading} />
      </div>
      <div className="relative z-10 -mt-13 flex-grow rounded-t-[20px] bg-gray-50">
        <main className="container mx-auto max-w-screen-lg px-4 pt-15 pb-[95px]">
          <div className="grid w-full gap-4">
            <StatusSection isConnected={true} isInitialized={true} />
            <ScheduleSection />
            <LetterSection isConnected={true} isInitialized={true} />
            <DDaySection isConnected={true} />
          </div>
        </main>
      </div>
      <div className="fixed bottom-0 left-1/2 z-10 w-[375px] -translate-x-1/2 bg-white">
        <NavBar />
      </div>
    </div>
  );
};

export const MainPage = () => {
  const { checkCoupleConnect } = useIscouple();
  const { getCoupleInfo } = useInitSettingQueries();

  const isLoading = checkCoupleConnect.isLoading || getCoupleInfo.isLoading;
  const isConnected = checkCoupleConnect.data?.result ?? false;
  const isInitialized = getCoupleInfo.data?.result?.isAnniversariesRegistered ?? false;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (!isConnected) {
    return <NotConnectedPage />;
  }

  if (!isInitialized) {
    return <NotInitializedPage isLoading={isLoading} />;
  }

  return <InitializedPage isLoading={isLoading} />;
};
