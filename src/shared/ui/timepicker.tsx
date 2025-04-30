import React, { useState } from "react";
import Picker from "react-mobile-picker";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "./drawer";
import { Button } from "./button";

interface TimePickerDrawerProps {
  onConfirm: (date: { ampm: string; hour: string; minute: string }) => void;
  children?: React.ReactNode;
}

export const TimePickerDrawer: React.FC<TimePickerDrawerProps> = ({ onConfirm, children }) => {
  const [open, setOpen] = useState(false);

  const ampmOptions = ["오전", "오후"];
  const hourBase = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const minuteBase = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  // 초기 값 설정
  const [pickerValue, setPickerValue] = useState({
    ampm: "오전",
    hour: hourBase[0],
    minute: minuteBase[0],
  });

  const handleConfirm = () => {
    onConfirm(pickerValue);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="w-full">{children}</div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full">
          <div className="relative flex h-[200px] w-full items-center justify-center">
            <div className="absolute inset-x-0 top-1/2 h-11 -translate-y-1/2 rounded-[10px] bg-gray-100" />
            <div className="relative w-full">
              <Picker
                value={pickerValue}
                onChange={setPickerValue}
                height={180}
                itemHeight={44}
                className="bg-transparent">
                <Picker.Column name="ampm" className="min-w-0 flex-1 px-4">
                  {ampmOptions.map(value => (
                    <Picker.Item key={value} value={value}>
                      <div className="text-center text-xl text-gray-800">{value}</div>
                    </Picker.Item>
                  ))}
                </Picker.Column>
                <Picker.Column name="hour" className="min-w-0 flex-1 px-4">
                  {hourBase.map((value, i) => (
                    <Picker.Item key={`${value}-${i}`} value={value}>
                      <div className="text-center text-xl text-gray-800">{value}</div>
                    </Picker.Item>
                  ))}
                </Picker.Column>
                <Picker.Column name="minute" className="min-w-0 flex-1 px-4">
                  {minuteBase.map((value, i) => (
                    <Picker.Item key={`${value}-${i}`} value={value}>
                      <div className="text-center text-xl text-gray-800">{value}</div>
                    </Picker.Item>
                  ))}
                </Picker.Column>
              </Picker>
            </div>
          </div>
          <DrawerHeader>
            <Button variant="active" onClick={handleConfirm} className="w-full">
              확인
            </Button>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
