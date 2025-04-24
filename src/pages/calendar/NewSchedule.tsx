import { EmojiSelector, FatigueBottomSheet, TimeSelector, Topbar } from "@/components/calendar";
import { Switch } from "@/components/ui/switch";
import Divider from "@/components/ui/Divider";
import useToggle from "@/hooks/useToggle";
import DateSelector from "@/components/calendar/DateSelector";
import { Button } from "@/components/ui/button";

export const CalendarNewSchedule = () => {
  const { isToggle, onToggle } = useToggle();

  return (
    <>
      <header className="mt-[70px] mb-8 flex flex-col items-center gap-7">
        <h1 text-gary-900 text-xl font-semibold>
          생성하기
        </h1>
        <Topbar isToggle={isToggle} onToggle={onToggle} />
      </header>
      <main className="flex flex-col gap-6 p-5">
        <section className="flex flex-col gap-2">
          <label htmlFor="title" className="text-gary-900 text-xl font-semibold">
            제목
          </label>
          <input className="h-6 w-full border border-gray-200 p-3" type="text" />
        </section>
        <Divider thickness="h-px" color="bg-gray-100" />
        {isToggle ? (
          <>
            <section className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-gary-900 text-xl font-semibold">이모티콘</h3>
                <EmojiSelector />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-gary-900 text-xl font-semibold">날짜</h3>
                <DateSelector />
              </div>
            </section>
            <section className="fixed bottom-6 left-1/2 w-[375px] -translate-x-1/2 transform px-4">
              <Button className="w-full" variant="submit" size="xl">
                확인
              </Button>
            </section>
          </>
        ) : (
          <>
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gary-900 text-xl font-semibold">하루종일</h3>
                <Switch id="airplane-mode" />
              </div>
              <div className="grid grid-cols-[1fr_112px_112px] gap-2">
                <h3 className="text-gary-900 text-xl font-semibold">시작</h3>
                <DateSelector />
                <TimeSelector />
              </div>
              <div className="grid grid-cols-[1fr_112px_112px] gap-2">
                <h3 className="text-gary-900 text-xl font-semibold">종료</h3>
                <DateSelector />
                <TimeSelector />
              </div>
            </section>
            <Divider thickness="h-px" color="bg-gray-100" />
            <section className="flex items-center justify-between">
              <h3 className="text-gary-900 text-xl font-semibold">피로도 선택</h3>
              <FatigueBottomSheet />
            </section>
          </>
        )}
      </main>
    </>
  );
};
