import { FatigueCard } from "./FatigueCard";

import { Button, Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/ui";
import { Fatigue, useScheduleStore } from "@/entities/schedule";
import { useShallow } from "zustand/shallow";
import { useToggle } from "@/shared/hooks";

export const FatigueBottomSheet = () => {
  const { isToggle, onToggle } = useToggle();

  // 전역 상태에서 피로도를 가져옵니다.
  const { schedule, setFatigue } = useScheduleStore(
    useShallow(state => ({
      schedule: state.schedule,
      setFatigue: state.setFatigue,
    }))
  );

  const handleSelect = (fatigue: Fatigue) => {
    setFatigue(fatigue); // 피로도를 전역 상태로 설정
  };

  const handleClose = () => {
    onToggle();
  };

  return (
    <Drawer open={isToggle} onOpenChange={onToggle}>
      <DrawerTrigger asChild>
        <Button variant="square" size="2xs">
          피로도 선택하기
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>해당 일정에 대한 피로도를 선택해 주세요.</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-3">
            <FatigueCard
              fatigue={Fatigue.VERY_TIRED}
              selected={schedule.fatigue === Fatigue.VERY_TIRED} // 전역 상태와 비교
              onClick={() => handleSelect(Fatigue.VERY_TIRED)} // 전역 상태로 선택
            />
            <FatigueCard
              fatigue={Fatigue.TIRED}
              selected={schedule.fatigue === Fatigue.TIRED} // 전역 상태와 비교
              onClick={() => handleSelect(Fatigue.TIRED)} // 전역 상태로 선택
            />
            <FatigueCard
              fatigue={Fatigue.GOOD}
              selected={schedule.fatigue === Fatigue.GOOD} // 전역 상태와 비교
              onClick={() => handleSelect(Fatigue.GOOD)} // 전역 상태로 선택
            />
          </div>
          <DrawerFooter className="p-0 py-3">
            <Button variant="submit" size="xl" onClick={handleClose}>
              확인
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
