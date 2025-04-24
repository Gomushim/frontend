import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProgressHeader } from './components/progressheader';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePickerDrawer } from '@/components/ui/datepicker';
import { formatDate } from '@/utils/formatdate';

export const Birthday: React.FC = () => {
  const [birthday, setBirthday] = useState('');
  const [isAgeVisible, setIsAgeVisible] = useState(false);
  const [isGenderVisible, setIsGenderVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (birthday) {
      navigate('/onboarding/alarm');
    }
  };

  const handleDateConfirm = (date: Date) => {
    setBirthday(formatDate(date));
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <ProgressHeader
        title="생년월일을 선택해주세요"
        highlight="생년월일"
        subtitle="생일에 상대방에게 알림을 줄게요!"
        progress={2/3}
        onBack={() => navigate(-1)}
        onClose={() => navigate('/')}
      />
      
      <div className="flex-1 px-4">
        <div className="mt-4">
          <DatePickerDrawer
            onConfirm={handleDateConfirm}
          >
            <Input
              value={birthday}
              placeholder="날짜를 선택해주세요."
              onChange={() => {}}
            />
          </DatePickerDrawer>
        </div>

        <div className="ml-2 mt-17 space-y-4">
          <label className="flex items-center space-x-2">
            <Checkbox
              checked={isAgeVisible}
              onCheckedChange={(checked) => setIsAgeVisible(checked as boolean)}
            />
            <span className="text-gray-900 text-md text-medium">이용자간 동의(필수)</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              checked={isGenderVisible}
              onCheckedChange={(checked) => setIsGenderVisible(checked as boolean)}
            />
            <span className="text-gray-900 text-md text-medium">개인정보 수집/이용 동의(필수)</span>
          </label>
        </div>
      </div>

      <div className="p-4">
        <Button
          text="다음"
          variant={birthday && (isAgeVisible && isGenderVisible) ? 'active' : 'inactive'}
          onClick={handleSubmit}
          disabled={!birthday || !(isAgeVisible && isGenderVisible)}
        />
      </div>
    </div>
  );
};
