// 외부 라이브러리
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";

// UI 컴포넌트
import { Button, Divider, Topbar } from "@/shared/ui";
import { DdayDateBottomSheet, EmojiSelector } from "@/features/d-day/ui";
import { TitleInput } from "@/features/schedule";

// 아이콘
import backIcon from "@/assets/icons/back.svg";

// 타입 및 API
import { useDdayMutation } from "@/entities/d-day";
import { Emoji } from "@/entities/d-day/model/types";

// 타입 정의
interface InitialDday {
  id: number | null;
  title: string;
  emoji: Emoji;
  date: string;
}

export const NewDday = () => {
  // 라우터 훅
  const navigate = useNavigate();

  // API 훅
  const { mutate: ddayMutate } = useDdayMutation("post");

  // 상태
  const initialState: InitialDday = {
    id: null,
    title: "",
    emoji: Emoji.HEART,
    date: "",
  };
  const [newDdayState, setNewDdayState] = useState<InitialDday>(initialState);

  // 유효성 검사
  const isFormValid = useMemo(() => {
    return newDdayState.title.trim() !== "" && newDdayState.date !== "";
  }, [newDdayState.title, newDdayState.date]);

  // 이벤트 핸들러
  const handleTitleChange = (title: string) => {
    setNewDdayState(prev => ({
      ...prev,
      title,
    }));
  };

  const handleEmojiChange = (emoji: Emoji) => {
    setNewDdayState(prev => ({
      ...prev,
      emoji,
    }));
  };

  const handleDateChange = (date: string) => {
    setNewDdayState(prev => ({
      ...prev,
      date,
    }));
  };

  const handlePostDday = async () => {
    ddayMutate(newDdayState, {
      onSuccess: () => {
        alert("디데이가 생성되었습니다.");
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

  // 렌더링
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
          <TitleInput value={newDdayState.title} onTitleChange={handleTitleChange} />
        </section>
        <Divider thickness="h-px" color="bg-gray-100" />
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-gray-900">이모티콘</h3>
            <EmojiSelector selectedEmoji={newDdayState.emoji} onEmojiChange={handleEmojiChange} />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-gray-900">날짜</h3>
            <DdayDateBottomSheet selectedDate={newDdayState.date} onDateChange={handleDateChange} />
          </div>
        </section>
        <section className="fixed bottom-6 left-1/2 w-[375px] -translate-x-1/2 transform px-4">
          <Button className="w-full" variant="submit" size="xl" onClick={handlePostDday} disabled={!isFormValid}>
            확인
          </Button>
        </section>
      </main>
    </>
  );
};
