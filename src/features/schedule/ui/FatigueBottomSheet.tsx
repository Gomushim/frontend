import { FatigueCard } from "./FatigueCard";
import { Button, Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/ui";
import { Fatigue } from "@/entities/schedule/type";
import { useToggle } from "@/shared/hooks";

interface FatigueBottomSheetProps {
  selectedFatigue: Fatigue;
  onFatigueChange: (fatigue: Fatigue) => void;
}

export const FatigueBottomSheet = ({ selectedFatigue, onFatigueChange }: FatigueBottomSheetProps) => {
  const { isToggle, onToggle } = useToggle();

  const handleSelect = (fatigue: Fatigue) => {
    onFatigueChange(fatigue);
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
      <DrawerContent className="p-4">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>해당 일정에 대한 피로도를 선택해 주세요.</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-3">
            <FatigueCard
              fatigue={Fatigue.VERY_TIRED}
              selected={selectedFatigue === Fatigue.VERY_TIRED}
              onClick={() => handleSelect(Fatigue.VERY_TIRED)}
            />
            <FatigueCard
              fatigue={Fatigue.TIRED}
              selected={selectedFatigue === Fatigue.TIRED}
              onClick={() => handleSelect(Fatigue.TIRED)}
            />
            <FatigueCard
              fatigue={Fatigue.GOOD}
              selected={selectedFatigue === Fatigue.GOOD}
              onClick={() => handleSelect(Fatigue.GOOD)}
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
