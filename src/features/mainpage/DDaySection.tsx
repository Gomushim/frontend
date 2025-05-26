import { useGetMainDdayList } from "@/entities/d-day";

import { useNavigate } from "react-router";
import { MainHeader } from "./ui/MainHeader";
import { DdayCard } from "../d-day/ui";
import CakeIcon from "@/assets/images/cake.svg";
interface DDaySectionProps {
  isConnected: boolean;
  isInitialized: boolean;
}

export const DDaySection = ({ isConnected, isInitialized }: DDaySectionProps) => {
  const { data: mainDdayList } = useGetMainDdayList(isConnected);
  const navigate = useNavigate();

  if (!isConnected || !isInitialized || !mainDdayList) {
    return (
      <>
        <MainHeader mainTitle="D-DAY" buttonText="더보기" isConnected={isConnected} isInitialized={isInitialized} />
        <div className="text-md mb-15 flex items-center rounded-2xl bg-white p-6 font-semibold text-gray-500">
          <img src={CakeIcon} alt="하트" className="mr-2 h-5 w-5 opacity-50" />
          <span>상대방과의 소중한 디데이를 등록하세요</span>
        </div>
      </>
    );
  }

  return (
    <>
      <MainHeader
        mainTitle="D-DAY"
        buttonText="더보기"
        onClick={() => navigate("/calendar/dday", { state: { from: "/" } })}
        isConnected={isConnected}
        isInitialized={isInitialized}
      />
      {mainDdayList.result.length > 0 ? (
        <ul className="mb-5 flex flex-col gap-3">
          {mainDdayList.result.map(dday => (
            <DdayCard key={dday.id} {...dday} className="bg-white" />
          ))}
        </ul>
      ) : (
        <div className="text-md mb-15 flex items-center rounded-2xl bg-white p-6 font-semibold text-gray-500">
          <img src={CakeIcon} alt="하트" className="mr-2 h-5 w-5 opacity-50" />
          <span>상대방과의 소중한 디데이를 등록하세요</span>
        </div>
      )}
    </>
  );
};
