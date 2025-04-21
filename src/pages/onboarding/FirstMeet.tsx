import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import ProgressHeader from '../../components/ui/progressheader';
import { Button } from '@/components/ui/button';
import Input from '@/componenets/Input/Input';
import { DatePickerDrawer } from '@/components/ui/datepicker';

export const FirstMeet: React.FC = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

      <div onClick={() => setIsDrawerOpen(true)} className="cursor-pointer flex-1 px-4 mt-6">
        <Input
          value={selectedDate ? formatDate(selectedDate) : ''}
          placeholder="날짜를 선택해주세요."
          status={selectedDate ? 'active' : 'inactive'}
          onClear={() => {
            setSelectedDate(null);
          }}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-left text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="p-4">
        <Button
          text="다음"
          variant={selectedDate ? 'active' : 'inactive'}
          disabled={!selectedDate}
          onClick={handleNext}
        />
      </div>

      <DatePickerDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onConfirm={handleDateConfirm}
        initialDate={selectedDate || undefined}
      />
    </div>
  );
};
