import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { FatigueCard } from "./FatigueCard";
import { useState } from "react";

type FatigueType = "VERY_TIRED" | "TIRED" | "GOOD";

export const FatigueBottomSheet = () => {
  const [selectedFatigue, setSelectedFatigue] = useState<FatigueType | null>(null);

  const handleSelect = (fatigue: FatigueType) => {
    setSelectedFatigue(fatigue);
  };

  // function onClick() {}

  return (
    <Drawer>
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
              fatigue="VERY_TIRED"
              selected={selectedFatigue === "VERY_TIRED"}
              onClick={() => handleSelect("VERY_TIRED")}
            />
            <FatigueCard fatigue="TIRED" selected={selectedFatigue === "TIRED"} onClick={() => handleSelect("TIRED")} />
            <FatigueCard fatigue="GOOD" selected={selectedFatigue === "GOOD"} onClick={() => handleSelect("GOOD")} />
          </div>
          <DrawerFooter className="p-0 py-3">
            <Button variant="submit" size="xl">
              확인
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
