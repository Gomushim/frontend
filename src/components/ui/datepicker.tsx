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
        <div className="flex flex-col items-center w-full">
          <div className="w-full h-[200px] flex items-center justify-center">
            <Picker value={pickerValue} onChange={setPickerValue} height={180} itemHeight={44}>
              <Picker.Column name="year">
                {years.map(year => (
                  <Picker.Item key={year} value={year}>
                    {({ selected }) => (
                      <div className={`w-24 text-center ${selected ? 'text-black font-semibold text-lg' : 'text-gray-400'}`}>
                        {year}
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
              <Picker.Column name="month">
                {months.map(month => (
                  <Picker.Item key={month} value={month}>
                    {({ selected }) => (
                      <div className={`w-24 text-center ${selected ? 'text-black font-semibold text-lg' : 'text-gray-400'}`}>
                        {month}
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
              <Picker.Column name="day">
                {days.map(day => (
                  <Picker.Item key={day} value={day}>
                    {({ selected }) => (
                      <div className={`w-24 text-center ${selected ? 'text-black font-semibold text-lg' : 'text-gray-400'}`}>
                        {day}
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>
          </div>
        </div>
        <DrawerHeader className="p-4">
          <Button
            text="확인"
            variant="active"
            onClick={handleConfirm}
            className="w-full"
          />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}; 