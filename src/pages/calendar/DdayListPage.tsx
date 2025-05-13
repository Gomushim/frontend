import { Button } from "@/shared/ui";
import backIcon from "@/assets/icons/back.svg";
import useIntersect from "@/shared/hooks/useIntersect";
import { useGetDdayList } from "@/entities/d-day";
import calendar from "@/assets/icons/calendar.svg";
import blackHeart from "@/assets/icons/blackHeart.svg";
import { useNavigate } from "react-router";
import { DdayCard, NoDdayMessage } from "@/features/d-day/ui";
import { useCoupleNickname } from "@/entities/couple_nickname";

export const CalendarDdayList = () => {
  const { data: ddayListData, fetchNextPage, isFetched } = useGetDdayList();
  const { getNickName } = useCoupleNickname();
  const { data: coupleNickname } = getNickName;

  const ref = useIntersect<HTMLDivElement>(() => {
    fetchNextPage();
  }, isFetched);

  const navigate = useNavigate();

  if (!ddayListData) {
    return;
  }

  const goCreateDdayPage = () => {
    navigate("/calendar/dday/new");
  };

  const goBack = () => {
    navigate(-1);
    return goBack;
  };

  return (
    <div className="px-[22px]">
      <header className="relative flex items-center justify-center">
        <Button variant="ghost" size="sIcon" className="absolute top-[60px] left-0" onClick={goBack}>
          <img src={backIcon} alt="뒤로가기" />
        </Button>
        <h1 className="pt-[60px] text-xl font-semibold text-gray-900">디데이</h1>
      </header>
      <main className="mt-5">
        {ddayListData.pages[0].data.length > 0 && (
          <div className="mt-4.5 flex items-center justify-between">
            <div className="items-cente flex gap-2">
              <img className="h-4.5 w-4.5 pt-1" src={calendar} alt="캘린더 아이콘" />
              <h2 className="text-xl font-semibold text-gray-900">{coupleNickname?.result.userNickname}</h2>
              <img src={blackHeart} alt="캘린더 아이콘" />
              <h2 className="text-xl font-semibold text-gray-900">{coupleNickname?.result.coupleNickname}</h2>
              <h2 className="text-xl font-semibold text-gray-900">님의 디데이</h2>
              <p className="text-md font-semibold text-gray-500">
                {ddayListData.pages.reduce((total, page) => total + page.data.length, 0)}
              </p>
            </div>
            <Button variant="square" size="2xs" onClick={goCreateDdayPage}>
              디데이 추가
            </Button>
          </div>
        )}

        {ddayListData.pages.map(page =>
          page.data.map(dday => (
            <ul className="mt-6 flex flex-col gap-3">
              <DdayCard {...dday} />
            </ul>
          ))
        )}
        {ddayListData.pages[0].data.length === 0 && <NoDdayMessage />}
        <div ref={ref} style={{ width: "1px", height: "1px", marginTop: "10px" }} />
      </main>
    </div>
  );
};
