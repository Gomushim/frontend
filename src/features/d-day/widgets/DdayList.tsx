import { Button } from "@/shared/ui";
import { DdayCard } from "./DdayCard";
import calendar from "@/assets/icons/calendar.svg";
import blackHeart from "@/assets/icons/blackHeart.svg";
import type { Dday } from "@/entities/d-day";

interface DdayListProps {
  author: string[];
  totalCount: number;
  data: Dday[];
}

export const DdayList = (props: DdayListProps) => {
  return (
    <>
      <div className="mt-4.5 flex items-center justify-between">
        <div className="items-cente flex gap-2">
          <img className="h-4.5 w-4.5 pt-1" src={calendar} alt="캘린더 아이콘" />
          <h2 className="text-xl font-semibold text-gray-900">{props.author[0]}</h2>
          <img src={blackHeart} alt="캘린더 아이콘" />
          <h2 className="text-xl font-semibold text-gray-900">{props.author[1]}</h2>
          <h2 className="text-xl font-semibold text-gray-900">님의 디데이</h2>
          <p className="text-md font-semibold text-gray-500">{props.totalCount}</p>
        </div>
        <Button variant="square" size="2xs">
          디데이 추가
        </Button>
      </div>

      <ul className="mt-6 flex flex-col gap-3">
        {props.data.map(dday => (
          <DdayCard {...dday} />
        ))}
      </ul>
    </>
  );
};
