// 외부 라이브러리
import { useNavigate, useParams } from "react-router";

// UI
import { Button } from "@/shared/ui";

// 아이콘
import letterIcon from "@/assets/icons/letter.svg";
import backIcon from "@/assets/icons/back.svg";
import gearIcon from "@/assets/icons/gear.svg";

// 도메인: schedule
import { ScheduleOverView } from "@/features/schedule";
import { useGetScheduleDetail } from "@/entities/schedule/query";

// 도메인: letter
import { LetterList, NoLetterMessage, WriteLetterBottomSheet } from "@/features/letter";

export const CalendarScheduleDetail = () => {
  // 라우터 훅
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const navigate = useNavigate();

  // API 훅
  const { data: scheduleData } = useGetScheduleDetail(scheduleId || "");

  if (!scheduleData) {
    return;
  }

  // 이벤트 핸들러
  const goBack = () => {
    navigate(-1);
    return goBack;
  };

  const { letters, ...rest } = scheduleData.result;

  const handleEditSchedule = () => {
    navigate(`/calendar/schedule/${scheduleId}/edit`);
  };

  return (
    <>
      <div className="px-[22px]">
        <header className="mt-[70px] mb-4 flex items-center justify-between">
          <Button variant="ghost" size="sIcon" onClick={goBack}>
            <img src={backIcon} alt="뒤로가기" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">일정 세부사항</h1>
          <Button variant="ghost" size="sIcon" className="" onClick={handleEditSchedule}>
            <img src={gearIcon} alt="일정 세부사항 설정" />
          </Button>
        </header>
        <ScheduleOverView {...rest} />
      </div>
      <main>
        <section className="mt-6 min-h-[calc(100vh-200px)] bg-gray-50 px-[22px] py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <img className="pb-1" src={letterIcon} alt="편지" />
              <h2 className="text-xl font-semibold text-gray-900">작성된 편지</h2>
              <p className="text-md font-semibold text-gray-500">{letters.length}</p>
            </div>
            <WriteLetterBottomSheet>
              <Button variant="square" size="2xs">
                편지 작성하기
              </Button>
            </WriteLetterBottomSheet>
          </div>
          {letters.length === 0 && <NoLetterMessage />}
          <LetterList letters={letters} />
        </section>
      </main>
    </>
  );
};
