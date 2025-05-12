// 외부 라이브러리
import { useDdayMutation, useDdayStore } from "@/entities/d-day";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/shallow";

// UI
import { Button, Divider, Topbar } from "@/shared/ui";

// 아이콘
import backIcon from "@/assets/icons/back.svg";

// 도메인: d-day
import { DdayDateBottomSheet, EmojiSelector } from "@/features/d-day/ui";
import { TitleInput } from "@/features/schedule";

export const NewDday = () => {
  const navigate = useNavigate();

  const { dday } = useDdayStore(
    useShallow(state => ({
      dday: state.dday,
    }))
  );

  const { mutate: ddayMutate } = useDdayMutation("post");

  const handlePostDday = async () => {
    ddayMutate(dday, {
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
          <TitleInput />
        </section>
        <Divider thickness="h-px" color="bg-gray-100" />
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
      </main>
    </>
  );
};
