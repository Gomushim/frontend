import { FatigueBottomSheet, Topbar } from "@/components/calendar";
import { Switch } from "@/components/ui/switch";
import grayCalendar from "@/assets/icons/grayCalendar.svg";
import grayClock from "@/assets/icons/grayClock.svg";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/Divider";

export const CalendarNewSchedule = () => {
  return (
    <div>
      <header className="mt-[70px] mb-8 flex flex-col items-center gap-7">
        <h1 text-gary-900 text-xl font-semibold>
          생성하기
        </h1>
        <Topbar />
      </header>
      <main className="flex flex-col gap-6 p-5">
        <section className="flex flex-col gap-2">
          <label htmlFor="title" className="text-gary-900 text-xl font-semibold">
            제목
          </label>
          <input className="h-6 w-full border border-gray-200 p-3" type="text" />
        </section>
        <Divider thickness="h-px" color="bg-gray-100" />
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-gary-900 text-xl font-semibold">하루종일</h3>
            <Switch id="airplane-mode" />
          </div>
          <div className="grid grid-cols-[1fr_112px_112px] gap-2">
            <h3 className="text-gary-900 text-xl font-semibold">시작</h3>
            <Button variant="calendar" size="xs" className="">
              <img src={grayCalendar} alt="날짜 선택" className="h-4.5 w-4.5" />
              2025.6.5
            </Button>
            <Button variant="calendar" size="xs" className="">
              <img src={grayClock} alt="시간 선택" className="h-5 w-5" />
              오후 5:00
            </Button>
          </div>
          <div className="grid grid-cols-[1fr_112px_112px] gap-2">
            <h3 className="text-gary-900 text-xl font-semibold">종료</h3>
            <Button variant="calendar" size="xs" className="">
              <img src={grayCalendar} alt="날짜 선택" className="h-4.5 w-4.5" />
              2025.6.5
            </Button>
            <Button variant="calendar" size="xs" className="">
              <img src={grayClock} alt="시간 선택" className="h-5 w-5" />
              오후 5:00
            </Button>
          </div>
        </section>
        <Divider thickness="h-px" color="bg-gray-100" />
        <section className="flex items-center justify-between">
          <h3 className="text-gary-900 text-xl font-semibold">피로도 선택</h3>
          <FatigueBottomSheet />
        </section>
      </main>
    </div>
  );
};
