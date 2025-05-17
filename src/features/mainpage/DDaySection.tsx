import { useGetMainDdayList } from "@/entities/d-day";

import { useNavigate } from "react-router";
import { MainHeader } from "./ui/MainHeader";
import { DdayCard } from "../d-day/ui";
import CakeIcon from "@/assets/images/cake.svg";
interface DDaySectionProps {
  isConnected: boolean;
}

export const DDaySection = ({ isConnected }: DDaySectionProps) => {
  const { data: mainDdayList } = useGetMainDdayList(isConnected);
  const navigate = useNavigate();

  if (!isConnected || !mainDdayList) {
    return (
      <>
        <MainHeader mainTitle="D-DAY" buttonText="더보기" onClick={() => alert("초기 설정을 완료해주세요!")} />
        <div className="flex items-center rounded-2xl bg-white px-4 py-8 text-sm font-semibold text-gray-500">
          <img src={CakeIcon} alt="하트" className="mr-2 h-5 w-5 opacity-50" />
          <span>상대방과의 소중한 디데이를 등록하세요</span>
        </div>
      </>
    );
  }

  return (
    <>
      <MainHeader mainTitle="D-DAY" buttonText="더보기" onClick={() => navigate("/calendar/dday")} />

      <ul className="mb-5 flex flex-col gap-3">
        {mainDdayList.result.map(dday => (
          <DdayCard {...dday} className="bg-white" />
        ))}
      </ul>
    </>
  );
};
