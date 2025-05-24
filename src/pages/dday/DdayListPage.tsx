// 외부 라이브러리
import { useLocation, useNavigate } from "react-router";

// UI
import { Button } from "@/shared/ui";

// 아이콘
import backIcon from "@/assets/icons/back.svg";
import calendar from "@/assets/icons/calendar.svg";
import blackHeart from "@/assets/icons/blackHeart.svg";

// 도메인: d-day
import { useGetDdayList } from "@/entities/d-day";
import { DdayCard, NoDdayMessage } from "@/features/d-day/ui";

// 도메인: couple
import { useCoupleNickname } from "@/entities/couple_nickname";

// 훅
import { useIntersect } from "@/shared/hooks";

export const CalendarDdayList = () => {
  // API 훅
  const { data: ddayListData, fetchNextPage, isFetched } = useGetDdayList();
  const { getNickName } = useCoupleNickname();
  const { data: coupleNickname } = getNickName;

  // 무한 스크롤 훅
  const ref = useIntersect<HTMLDivElement>(() => {
    fetchNextPage();
  }, isFetched);

  // 라우터 훅
  const location = useLocation();
  const navigate = useNavigate();

  const from = (location.state as { from: string } | null)?.from || "/";

  if (!ddayListData) {
    return;
  }

  // 이벤트 핸들러
  const goCreateDdayPage = () => {
    navigate("/calendar/dday/new", { state: { from: "/calendar/dday" } });
  };

  const goBack = () => {
    navigate(from);
  };

  return (
    <div className="px-[22px]">
      {/* 헤더 영역 */}
      <header className="relative flex items-center justify-center">
        <Button variant="ghost" size="sIcon" className="absolute top-[60px] left-0" onClick={goBack}>
          <img src={backIcon} alt="뒤로가기" />
        </Button>
        <h1 className="pt-[60px] text-xl font-semibold text-gray-900">디데이</h1>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="mt-5">
        {/* 커플 정보 및 디데이 추가 버튼 */}
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

        {/* 디데이 리스트 */}
        <ul className="mt-6 flex flex-col gap-3">
          {ddayListData.pages.map(page => page.data.map(dday => <DdayCard key={dday.id} {...dday} />))}
        </ul>

        {/* 빈 상태 메시지 */}
        {ddayListData.pages[0].data.length === 0 && <NoDdayMessage />}

        {/* 무한 스크롤 트리거 */}
        <div ref={ref} style={{ width: "1px", height: "1px", marginTop: "10px" }} />
      </main>
    </div>
  );
};
