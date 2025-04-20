import React, { useState } from 'react';
import ProgressHeader from '../components/ProgressHeader';
import Button from '@/componenets/Button/Button';
import DatePickerModal from '../components/DatePickerModal';
import Input from '@/componenets/Input/Input'; // Input 컴포넌트 임포트

const FirstMeet: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
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
        <label className="block text-gray-800 text-base mb-2"></label>
        <Input
          value={selectedDate ? formatDate(selectedDate) : ''}
          onChange={() => setShowPicker(true)} // 날짜를 변경할 때 Picker 열기
          placeholder="날짜를 선택해주세요."
          status={selectedDate ? 'active' : 'inactive'}
          onClear={() => setSelectedDate(null)} // 날짜 초기화
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-left text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          onFocus={() => setShowPicker(true)} // Input 클릭 시 Picker 열기
        />
      </div>

      <div className="py-1 flex justify-center mt-auto">
        <Button
          text="다음"
          variant={selectedDate ? 'active' : 'inactive'}
          disabled={!selectedDate}
        />
      </div>

      <DatePickerModal
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
        onConfirm={(date) => setSelectedDate(date)}
        defaultDate={selectedDate || new Date()}
      />
    </div>
  );
};

export default FirstMeet;
