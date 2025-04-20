import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import ProgressHeader from '../components/ProgressHeader';
import Button from '@/componenets/Button/Button';
import Input from '@/componenets/Input/Input';
import Picker from 'react-mobile-picker';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'; // shadcn drawer

export const FirstMeet: React.FC = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const today = new Date();
const years = Array.from({ length: 100 }, (_, i) => String(today.getFullYear() - i));
const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

const optionGroups = {
  year: years,
  month: months,
  day: days,
};

const [pickerValue, setPickerValue] = useState({
  year: String(today.getFullYear()),
  month: String(today.getMonth() + 1),
  day: String(today.getDate()),
});


  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleNext = () => {
    if (selectedDate) {
      navigate('/onboarding/military-day');
    }
  };

  const handleConfirm = () => {
    const { year, month, day } = pickerValue;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    setSelectedDate(date);
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-0">
      <ProgressHeader
        title="연인과 처음 만난 날은 언제인가요?"
        highlight="처음 만난 날"
        subtitle="두 분의 첫 만남을 기록해주세요."
        progress={1 / 3}
        onBack={() => console.log('뒤로가기')}
        onClose={() => console.log('닫기')}
      />

      <div className="flex-1 px-4 mt-6">
        <Input
          value={selectedDate ? formatDate(selectedDate) : ''}
          onChange={() => setIsDrawerOpen(true)}
          placeholder="날짜를 선택해주세요."
          status={selectedDate ? 'active' : 'inactive'}
          onClear={() => {
            setSelectedDate(null);
            setPickerValue({
              year: String(today.getFullYear()),
              month: String(today.getMonth() + 1),
              day: String(today.getDate()),
            });
          }}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-left text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          onFocus={() => setIsDrawerOpen(true)}
        />
      </div>

      <div className="py-1 flex justify-center mt-auto">
        <Button
          text="다음"
          variant={selectedDate ? 'active' : 'inactive'}
          disabled={!selectedDate}
          onClick={handleNext}
        />
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="pb-6">
          
          <div className="flex flex-col items-center w-full">
            <div className="w-full  h-[200px] flex items-center justify-center">
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
          </div><DrawerHeader className="flex justify-between px-6 pt-4">
            <Button
              text="확인"
              variant="active"
              onClick={handleConfirm}
              className="w-full"
            />
          </DrawerHeader>
        </DrawerContent>
        
      </Drawer>
    </div>
  );
};
