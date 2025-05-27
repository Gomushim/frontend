// 외부 라이브러리
import { useLocation, useNavigate, useParams } from "react-router";

// UI 컴포넌트
import { Button, CountInput, DeleteAlert, Divider, Topbar } from "@/shared/ui";
import { DdayDateBottomSheet, EmojiSelector } from "@/features/d-day";
// 아이콘
import backIcon from "@/assets/icons/back.svg";

// API 및 훅
import { useCreateDdayMutation, useDeleteDdayMutation, useUpdateDdayMutation } from "@/entities/d-day";
import { useInitializeDdayFormFromCache, useNewDdayForm } from "@/features/d-day";

export const NewDday = () => {
  // 라우터 훅
  const { ddayId } = useParams<{ ddayId?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const from = (location.state as { from: string } | undefined)?.from || "/calendar";

  const handleDone = () => {
    navigate(from); // 원래 있던 곳으로 이동
  };

  // 상태
  const isEditMode = !!ddayId;

  // 상태 및 폼 관련 커스텀 훅
  const { newDdayState, handleChange, isFormValid } = useNewDdayForm();

  useInitializeDdayFormFromCache(ddayId!, handleChange, from);

  // API 훅
  const { mutate: ddayMutate } = useCreateDdayMutation(newDdayState);
  const { mutate: ddayDeleteMutate } = useDeleteDdayMutation(ddayId!, newDdayState.date);
  const { mutate: ddayUpdateMutate } = useUpdateDdayMutation(newDdayState);

  // 이벤트 핸들러
  const handlePostDday = async () => {
    if (isEditMode) {
      ddayUpdateMutate(undefined, {
        onSuccess: () => {
          alert("디데이가 수정되었습니다.");
          handleDone();
        },
      });
    } else {
      ddayMutate(undefined, {
        onSuccess: () => {
          alert("디데이가 생성되었습니다.");
          handleDone();
        },
        onError: error => {
          console.log(error);
        },
      });
    }
  };

  const handleDeleteDday = () => {
    ddayDeleteMutate(undefined, {
      onSuccess: () => {
        alert("디데이가 삭제되었습니다.");
        handleDone();
      },
      onError: error => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <header className="relative mt-5 mb-8 flex flex-col items-center gap-7">
        <div className="">
          <h1 className="text-xl font-semibold text-gray-900">{isEditMode ? "수정하기" : "생성하기"}</h1>
          <Button variant="ghost" size="sIcon" className="absolute top-0 left-5" onClick={handleDone}>
            <img src={backIcon} alt="뒤로가기" />
          </Button>
        </div>
        <Topbar isEditMode={isEditMode} />
      </header>
      <main className="flex flex-col gap-6 p-5">
        <section className="flex flex-col gap-2">
          <label htmlFor="title" className="text-gary-900 text-xl font-semibold">
            제목
          </label>
          <CountInput
            type="text"
            id="title"
            className="h-12 w-full border bg-gray-50"
            value={newDdayState.title}
            onChange={e => handleChange("title", e.target.value)}
            maxLength={10}
            placeholder="제목을 입력해 주세요"
          />
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
            <DeleteAlert
              onDelete={handleDeleteDday}
              title="디데이 삭제"
              description="정말 디데이를 삭제하시겠어요?"
              buttonText="삭제"
              cancelText="취소">
              <Button className="w-[50%]" variant="delete" size="xl" disabled={!isFormValid}>
                삭제
              </Button>
            </DeleteAlert>
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
