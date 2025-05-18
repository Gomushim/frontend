// 외부 라이브러리
import { useNavigate, useParams } from "react-router";

// UI 컴포넌트
import { Button, Divider, Topbar } from "@/shared/ui";
import { DdayDateBottomSheet, EmojiSelector } from "@/features/d-day";
import { TitleInput } from "@/features/schedule";

// 아이콘
import backIcon from "@/assets/icons/back.svg";

// API 및 훅
import { useCreateDdayMutation, useUpdateDdayMutation } from "@/entities/d-day";
import { useInitializeDdayFormFromCache, useNewDdayForm } from "@/features/d-day";

export const NewDday = () => {
  // 라우터 훅
  const navigate = useNavigate();
  const { ddayId } = useParams<{ ddayId?: string }>();

  const isEditMode = !!ddayId;

  // 상태 및 폼 관련 커스텀 훅
  const { newDdayState, handleChange, isFormValid } = useNewDdayForm();

  // API 훅
  const { mutate: ddayMutate } = useCreateDdayMutation(newDdayState);
  const { mutate: ddayUpdateMutate } = useUpdateDdayMutation(newDdayState);

  useInitializeDdayFormFromCache(ddayId!, handleChange);

  // 이벤트 핸들러
  const handlePostDday = async () => {
    if (isEditMode) {
      ddayUpdateMutate(undefined, {
        onSuccess: () => {
          alert("디데이가 수정되었습니다.");
          navigate(-1);
        },
      });
    } else {
      ddayMutate(undefined, {
        onSuccess: () => {
          alert("디데이가 생성되었습니다.");
          navigate(-1);
        },
        onError: error => {
          console.log(error);
        },
      });
    }
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
          <TitleInput value={newDdayState.title} onTitleChange={value => handleChange("title", value)} />
        </section>
        <Divider thickness="h-px" color="bg-gray-100" />
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-gray-900">이모티콘</h3>
            <EmojiSelector selectedEmoji={newDdayState.emoji} onEmojiChange={value => handleChange("emoji", value)} />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-gray-900">날짜</h3>
            <DdayDateBottomSheet selectedDate={newDdayState.date} onDateChange={value => handleChange("date", value)} />
          </div>
        </section>
        <section
          className={`fixed bottom-6 left-1/2 w-[375px] -translate-x-1/2 transform px-4 ${isEditMode && "flex justify-center gap-3"}`}>
          {isEditMode && (
            <Button className="w-[50%]" variant="delete" size="xl" disabled={!isFormValid}>
              삭제
            </Button>
          )}
          <Button
            className={`w-full ${isEditMode && "w-[50%]"}`}
            variant="submit"
            size="xl"
            onClick={handlePostDday}
            disabled={!isFormValid}>
            완료
          </Button>
        </section>
      </main>
    </>
  );
};
