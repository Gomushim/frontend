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
import { useCoupleNickname } from "@/entities/couple_nickname/queries";
import { NavBar } from "@/widgets/navbar/ui";
import LoadingSpinner from "@/shared/ui/loading";

const NotConnectedPage = ({ coupleInfo }: { coupleInfo: { userNickname: string; coupleNickname: string } }) => {
  return (
    <div className="flex flex-col bg-gray-50 ">
      <TopSection isConnected={false} isInitialized={false} coupleInfo={coupleInfo} />
      <div>
        <SpecialDateSection isConnected={false} isInitialized={false} />
      </div>
      <div className="relative z-10 -mt-13 flex-grow rounded-t-[20px] bg-gray-50">
        <main className="container mx-auto max-w-[1920px] px-4 pt-15 pb-[95px]">
          <div className="grid w-full gap-4">
            <StatusSection isConnected={false} isInitialized={false} />
            <ScheduleSection isConnected={false} isInitialized={false} />
            <LetterSection isConnected={false} isInitialized={false} />
            <DDaySection isConnected={false} isInitialized={false} />
          </div>
        </main>
      </div>
      <div className="pc:w-[375px] fixed bottom-0 left-1/2 z-10 w-full -translate-x-1/2 bg-white">
        <NavBar />
      </div>
    </div>
  );
};

const NotInitializedPage = ({
  coupleInfo,
}: {
  isLoading: boolean;
  coupleInfo: { userNickname: string; coupleNickname: string };
}) => {
  return (
    <div className="flex flex-col bg-gray-50 pt-11">
      <TopSection isConnected={true} isInitialized={false} coupleInfo={coupleInfo} />
      <div>
        <SpecialDateSection isConnected={true} isInitialized={false} />
      </div>
      <div className="relative z-10 -mt-13 flex-grow rounded-t-[20px] bg-gray-50">
        <main className="container mx-auto max-w-full px-4 pt-15 pb-[95px]">
          <div className="grid w-full gap-4">
            <StatusSection isConnected={true} isInitialized={false} />
            <ScheduleSection isConnected={true} isInitialized={false} />
            <LetterSection isConnected={true} isInitialized={false} />
            <DDaySection isConnected={true} isInitialized={false} />
          </div>
        </main>
      </div>
      <div className="pc:w-[375px] fixed bottom-0 left-1/2 z-10 w-full -translate-x-1/2 bg-white">
        <NavBar />
      </div>
    </div>
  );
};

const InitializedPage = ({
  coupleInfo,
}: {
  isLoading: boolean;
  coupleInfo: { userNickname: string; coupleNickname: string };
}) => {
  return (
    <div className="flex flex-col bg-gray-50 pt-11">
      <TopSection isConnected={true} isInitialized={true} coupleInfo={coupleInfo} />
      <div>
        <SpecialDateSection isConnected={true} isInitialized={true} />
      </div>
      <div className="relative z-10 -mt-13 flex-grow rounded-t-[20px] bg-gray-50">
        <main className="container mx-auto max-w-[1920px] px-4 pt-15 pb-[95px]">
          <div className="grid w-full gap-4">
            <StatusSection isConnected={true} isInitialized={true} />
            <ScheduleSection isConnected={true} isInitialized={true} />
            <LetterSection isConnected={true} isInitialized={true} />
            <DDaySection isConnected={true} isInitialized={true} />
          </div>
        </main>
      </div>
      <div className="pc:w-[375px] fixed bottom-0 left-1/2 z-10 w-full -translate-x-1/2 bg-white">
        <NavBar />
      </div>
    </div>
  );
};

export const MainPage = () => {
  const { checkCoupleConnect } = useIscouple();
  const { getCoupleInfo } = useInitSettingQueries();
  const isConnected = checkCoupleConnect.data?.result ?? false;
  const isInitialized = getCoupleInfo.data?.result?.isAnniversariesRegistered ?? false;
  const { getNickName } = useCoupleNickname(isConnected || isInitialized);

  const coupleInfo = getNickName.data?.result || {
    userNickname: "",
    coupleNickname: "",
  };

  const isLoading = checkCoupleConnect.isLoading || getCoupleInfo.isLoading || getNickName.isLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-11">
        <LoadingSpinner text="메인페이지로 이동 중..." />
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col bg-gray-50 pt-11">
        <NotConnectedPage coupleInfo={coupleInfo} />
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="flex flex-col bg-gray-50 pt-11">
        <NotInitializedPage isLoading={isLoading} coupleInfo={coupleInfo} />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-50 pt-11">
      <InitializedPage isLoading={isLoading} coupleInfo={coupleInfo} />
    </div>
  );
};
