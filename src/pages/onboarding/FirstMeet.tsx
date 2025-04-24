import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProgressHeader } from './components/progressheader';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { DatePickerDrawer } from '@/components/ui/datepicker';
import { formatDate } from '@/utils/formatdate';

export const FirstMeet: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleNext = () => {
    if (selectedDate) {
      navigate('/onboarding/military-day');
    }
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-0">
      <ProgressHeader
        title="연인과 처음 만난 날은 언제인가요?"
        highlight="처음 만난 날"
        subtitle="두 분의 첫 만남을 기록해주세요."
        progress={1 / 3}
        onBack={() => navigate(-1)}
        onClose={() => navigate('/')}
      />

      <div className="flex-1 px-4 mt-6">
        <DatePickerDrawer
          onConfirm={handleDateConfirm}
        >
          <Input
            value={selectedDate ? formatDate(selectedDate) : ''}
            placeholder="날짜를 선택해주세요."
            status={selectedDate ? 'active' : 'inactive'}
            onClear={() => {
              setSelectedDate(null);
            }}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-left text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </DatePickerDrawer>
      </div>

      <div className="p-4">
        <Button
          text="다음"
          variant={selectedDate ? 'active' : 'inactive'}
          disabled={!selectedDate}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};
