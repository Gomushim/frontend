import { Topbar, Divider, Button } from "@/shared/ui";
import { useToggle } from "@/shared/hooks";
import { DdayDateBottomSheet, EmojiSelector } from "@/features/d-day/widgets";
import { AllDayToggleButton, DateBottomSheet, FatigueBottomSheet, TimeBottomSheet } from "@/features/schedule/widgets";
import { TitleInput } from "@/features/schedule/widgets/TitleInput";
import { useScheduleStore } from "@/entities/schedule";
import { useShallow } from "zustand/shallow";
import { useScheduleMutation } from "@/entities/schedule/mutation";
import { useDdayMutation, useDdayStore } from "@/entities/d-day";
import backIcon from "@/assets/icons/back.svg";
import { useNavigate } from "react-router";

export const CalendarNewSchedule = () => {
  const navigate = useNavigate();

  const { schedule, reset } = useScheduleStore(
    useShallow(state => ({
      schedule: state.schedule,
      reset: state.reset,
    }))
  );

  const { dday } = useDdayStore(
    useShallow(state => ({
      dday: state.dday,
    }))
  );

  const { isToggle, onToggle } = useToggle();
  const { mutate } = useScheduleMutation(schedule, "post");
  const { mutate: ddayMutate } = useDdayMutation("post");

  const handlePostSchedule = async () => {
    mutate(undefined, {
      onSuccess: () => {
        alert("일정이 생성되었습니다.");
        reset();
        navigate("/calendar");
      },
      onError: error => {
        console.log(error);
      },
    });
  };

  const handlePostDday = async () => {
    ddayMutate(dday, {
      onSuccess: () => {
        alert("디데이가 생성되었습니다.");
        reset();
        navigate(-1);
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
        <Topbar isToggle={isToggle} onToggle={onToggle} />
      </header>
      <main className="flex flex-col gap-6 p-5">
        <section className="flex flex-col gap-2">
          <TitleInput />
        </section>
        <Divider thickness="h-px" color="bg-gray-100" />
        {isToggle ? (
          <>
            <section className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-gray-900">이모티콘</h3>
                <EmojiSelector />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-gray-900">날짜</h3>
                <DdayDateBottomSheet />
              </div>
            </section>
            <section className="fixed bottom-6 left-1/2 w-[375px] -translate-x-1/2 transform px-4">
              <Button className="w-full" variant="submit" size="xl" onClick={handlePostDday}>
                확인
              </Button>
            </section>
          </>
        ) : (
          <>
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">하루종일</h3>
                <AllDayToggleButton />
              </div>
              <div className="grid grid-cols-[1fr_120px_115px] gap-2">
                <h3 className="text-xl font-semibold text-gray-900">시작</h3>
                <DateBottomSheet type="start" />
                <TimeBottomSheet target="start" />
              </div>
              <div className="grid grid-cols-[1fr_120px_115px] gap-2">
                <h3 className="text-xl font-semibold text-gray-900">종료</h3>
                <DateBottomSheet type="end" />
                <TimeBottomSheet target="end" />
              </div>
            </section>
            <Divider thickness="h-px" color="bg-gray-100" />
            <section className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">피로도 선택</h3>
              <FatigueBottomSheet />
            </section>
            <section className="fixed bottom-6 left-1/2 w-[375px] -translate-x-1/2 transform px-4">
              <Button className="w-full" variant="submit" size="xl" onClick={handlePostSchedule}>
                확인
              </Button>
            </section>
          </>
        )}
      </main>
    </>
  );
};
