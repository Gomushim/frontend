import React, { useState } from 'react';
import Picker from 'react-mobile-picker';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

interface DatePickerDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (date: Date) => void;
  initialDate?: Date;
}

export const DatePickerDrawer: React.FC<DatePickerDrawerProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  initialDate,
}) => {
  const today = new Date();
  const years = Array.from({ length: 100 }, (_, i) => String(today.getFullYear() - i));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

  const [pickerValue, setPickerValue] = useState({
    year: initialDate ? String(initialDate.getFullYear()) : String(today.getFullYear()),
    month: initialDate ? String(initialDate.getMonth() + 1) : String(today.getMonth() + 1),
    day: initialDate ? String(initialDate.getDate()) : String(today.getDate()),
  });

  const handleConfirm = () => {
    const { year, month, day } = pickerValue;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    onConfirm(date);
    onOpenChange(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="w-full ">
          <div className="w-full h-[200px] flex items-center justify-center relative ">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-11 bg-gray-100 rounded-[10px]" />
            <div className="relative w-full">
              <Picker value={pickerValue} onChange={setPickerValue} height={180} itemHeight={44} className="bg-transparent">
                <Picker.Column name="year" className="flex-1 min-w-0 px-4">
                  {years.map(year => (
                    <Picker.Item key={year} value={year}>
                      <div className="text-center text-gray-800 text-xl">
                        {year}
                      </div>
                    </Picker.Item>
                  ))}
                </Picker.Column>
                <Picker.Column name="month" className="flex-1 min-w-0 px-4">
                  {months.map(month => (
                    <Picker.Item key={month} value={month}>
                      <div className="text-center text-gray-800 text-xl">
                        {month}
                      </div>
                    </Picker.Item>
                  ))}
                </Picker.Column>
                <Picker.Column name="day" className="flex-1 min-w-0 px-4">
                  {days.map(day => (
                    <Picker.Item key={day} value={day}>
                      <div className="text-center text-gray-800 text-xl">
                        {day}
                      </div>
                    </Picker.Item>
                  ))}
                </Picker.Column>
              </Picker>
            </div>
          </div>
          <DrawerHeader>
            <Button
              text="확인"
              variant="active"
              onClick={handleConfirm}
              className="w-full"
            />
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
}; 