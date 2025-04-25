import { NoDdayMessage } from "@/features/d-day/widgets";
import { Button } from "@/shared/ui";
import backIcon from "@/assets/icons/back.svg";

export const CalendarDdayList = () => {
  return (
    <div className="px-[22px]">
      <header className="relative flex items-center justify-center">
        <Button variant="ghost" size="icon" className="absolute top-[60px] left-0">
          <img src={backIcon} alt="뒤로가기" />
        </Button>
        <h1 className="pt-[70px] pb-2.5">디데이</h1>
      </header>
      <main>
        <NoDdayMessage />
      </main>
    </div>
  );
};
