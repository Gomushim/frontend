// 외부 라이브러리
import { useNavigate, useParams } from "react-router";

// UI
import { Button, DeleteAlert, Divider, Topbar } from "@/shared/ui";

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
import { useCreateScheduleMutation, useDeleteScheduleMutation, useUpdateScheduleMutation } from "@/entities/schedule";
import { useScheduleForm, useInitializeScheduleFormFromCache } from "@/features/schedule/hooks";

export const CalendarNewSchedule = () => {
  // 라우터 훅
  const navigate = useNavigate();
  const { scheduleId } = useParams<{ scheduleId?: string }>();
  const isEditMode = !!scheduleId;

  // 스케쥴 폼 훅
  const { form, updateField, isValid } = useScheduleForm();

  useInitializeScheduleFormFromCache(scheduleId!, updateField);

  // API 훅
  const { mutate } = useCreateScheduleMutation(form);
  const { mutate: deleteMutate } = useDeleteScheduleMutation(scheduleId!, form);
  const { mutate: updateMutate } = useUpdateScheduleMutation(form);

  const handlePostSchedule = async () => {
    if (isEditMode) {
      updateMutate(undefined, {
        onSuccess: () => {
          alert("일정이 변경되었습니다.");
          navigate("/calendar");
        },
        onError: error => {
          console.log(error);
        },
      });
    } else {
      mutate(undefined, {
        onSuccess: () => {
          alert("일정이 생성되었습니다.");
          navigate("/calendar");
        },
      });
    }
  };

  const handleDelete = () => {
    deleteMutate(undefined, {
      onSuccess: () => {
        alert("일정이 삭제되었습니다.");
        navigate("/calendar");
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
          <TitleInput value={form.title} onTitleChange={value => updateField("title", value)} />
        </section>
        <Divider thickness="h-px" color="bg-gray-100" />

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">하루종일</h3>
            <AllDayToggleButton isAllDay={form.isAllDay} onToggle={value => updateField("isAllDay", value)} />
          </div>
          <div className="grid grid-cols-[1fr_120px_115px] gap-2">
            <h3 className="text-xl font-semibold text-gray-900">시작</h3>
            <DateBottomSheet selectedDate={form.startDate} onDateChange={value => updateField("startDate", value)} />
            <TimeBottomSheet
              selectedDate={form.startDate}
              onDateChange={value => updateField("startDate", value)}
              isAllDay={form.isAllDay}
            />
          </div>
          <div className="grid grid-cols-[1fr_120px_115px] gap-2">
            <h3 className="text-xl font-semibold text-gray-900">종료</h3>
            <DateBottomSheet selectedDate={form.endDate} onDateChange={value => updateField("endDate", value)} />
            <TimeBottomSheet
              selectedDate={form.endDate}
              onDateChange={value => updateField("endDate", value)}
              isAllDay={form.isAllDay}
            />
          </div>
        </section>
        <Divider thickness="h-px" color="bg-gray-100" />
        <section className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">피로도 선택</h3>
          <FatigueBottomSheet selectedFatigue={form.fatigue} onFatigueChange={value => updateField("fatigue", value)} />
        </section>
        <section
          className={`fixed bottom-6 left-1/2 w-[375px] -translate-x-1/2 transform px-4 ${isEditMode && "flex justify-center gap-3"}`}>
          {isEditMode && (
            <DeleteAlert
              onDelete={handleDelete}
              title="일정 삭제"
              description="정말 일정을 삭제하시겠어요?"
              buttonText="삭제"
              cancelText="취소">
              <Button className="w-[50%]" variant="delete" size="xl" disabled={!isValid}>
                삭제
              </Button>
            </DeleteAlert>
          )}
          <Button
            className={`w-full ${isEditMode && "w-[50%]"}`}
            variant="submit"
            size="xl"
            onClick={handlePostSchedule}
            disabled={!isValid}>
            완료
          </Button>
        </section>
      </main>
    </>
  );
};
