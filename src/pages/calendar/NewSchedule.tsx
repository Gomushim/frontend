// 외부 라이브러리
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";

// UI
import { Button, Divider, Topbar } from "@/shared/ui";

// 아이콘
import backIcon from "@/assets/icons/back.svg";

// 도메인: schedule
import {
  AllDayToggleButton,
  DateBottomSheet,
  FatigueBottomSheet,
  TimeBottomSheet,
  TitleInput,
} from "@/features/schedule/ui";
import { useCreateScheduleMutation } from "@/entities/schedule";
import { Fatigue } from "@/entities/schedule/type";

// 타입 정의
interface InitialSchedule {
  id: number | null;
  title: string;
  startDate: string;
  endDate: string;
  isAllDay: boolean;
  fatigue: Fatigue;
}

export const CalendarNewSchedule = () => {
  // 라우터 훅
  const navigate = useNavigate();

  // 상태
  const initialState: InitialSchedule = {
    id: null,
    title: "",
    startDate: "",
    endDate: "",
    isAllDay: false,
    fatigue: Fatigue.GOOD,
  };
  const [newScheduleState, setNewScheduleState] = useState<InitialSchedule>(initialState);

  // API 훅
  const { mutate } = useCreateScheduleMutation(newScheduleState);

  // 유효성 검사
  const isFormValid = useMemo(() => {
    return newScheduleState.title.trim() !== "" && newScheduleState.startDate !== "" && newScheduleState.endDate !== "";
  }, [newScheduleState.title, newScheduleState.startDate, newScheduleState.endDate]);

  // 이벤트 핸들러
  const handleTitleChange = (title: string) => {
    setNewScheduleState(prev => ({
      ...prev,
      title,
    }));
  };

  const handleStartDateChange = (date: string) => {
    setNewScheduleState(prev => ({
      ...prev,
      startDate: date,
    }));
  };

  const handleEndDateChange = (date: string) => {
    setNewScheduleState(prev => ({
      ...prev,
      endDate: date,
    }));
  };

  const handleAllDayToggle = () => {
    setNewScheduleState(prev => ({
      ...prev,
      isAllDay: !prev.isAllDay,
    }));
  };

  const handleFatigueChange = (fatigue: Fatigue) => {
    setNewScheduleState(prev => ({
      ...prev,
      fatigue,
    }));
  };

  const handlePostSchedule = async () => {
    mutate(undefined, {
      onSuccess: () => {
        alert("일정이 생성되었습니다.");
        navigate("/calendar");
      },
      onError: error => {
        console.log(error);
      },
    });
  };

  const goBack = () => {
    navigate(-1);
    return goBack;
  };

  return (
    <>
      <header className="mt-[70px] mb-8 flex flex-col items-center gap-7">
        <div className="">
          <h1 className="text-xl font-semibold text-gray-900">생성하기</h1>
          <Button variant="ghost" size="sIcon" className="absolute top-17 left-5" onClick={goBack}>
            <img src={backIcon} alt="뒤로가기" />
          </Button>
        </div>
        <Topbar />
      </header>
      <main className="flex flex-col gap-6 p-5">
        <section className="flex flex-col gap-2">
          <TitleInput value={newScheduleState.title} onTitleChange={handleTitleChange} />
        </section>
        <Divider thickness="h-px" color="bg-gray-100" />

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">하루종일</h3>
            <AllDayToggleButton isAllDay={newScheduleState.isAllDay} onToggle={handleAllDayToggle} />
          </div>
          <div className="grid grid-cols-[1fr_120px_115px] gap-2">
            <h3 className="text-xl font-semibold text-gray-900">시작</h3>
            <DateBottomSheet selectedDate={newScheduleState.startDate} onDateChange={handleStartDateChange} />
            <TimeBottomSheet
              selectedDate={newScheduleState.startDate}
              onDateChange={handleStartDateChange}
              isAllDay={newScheduleState.isAllDay}
            />
          </div>
          <div className="grid grid-cols-[1fr_120px_115px] gap-2">
            <h3 className="text-xl font-semibold text-gray-900">종료</h3>
            <DateBottomSheet selectedDate={newScheduleState.endDate} onDateChange={handleEndDateChange} />
            <TimeBottomSheet
              selectedDate={newScheduleState.endDate}
              onDateChange={handleEndDateChange}
              isAllDay={newScheduleState.isAllDay}
            />
          </div>
        </section>
        <Divider thickness="h-px" color="bg-gray-100" />
        <section className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">피로도 선택</h3>
          <FatigueBottomSheet selectedFatigue={newScheduleState.fatigue} onFatigueChange={handleFatigueChange} />
        </section>
        <section className="fixed bottom-6 left-1/2 w-[375px] -translate-x-1/2 transform px-4">
          <Button className="w-full" variant="submit" size="xl" onClick={handlePostSchedule} disabled={!isFormValid}>
            확인
          </Button>
        </section>
      </main>
    </>
  );
};
