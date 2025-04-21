import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import ProgressHeader from '@/components/ui/progressheader';
import Button from '@/componenets/Button/Button';
import Input from '@/componenets/Input/Input';
import Picker from 'react-mobile-picker';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from '@/components/ui/drawer';

export const Birthday: React.FC = () => {
  const [birthday, setBirthday] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAgeVisible, setIsAgeVisible] = useState(false);
  const [isGenderVisible, setIsGenderVisible] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = () => {
    if (birthday) {
      navigate('/onboarding/alarm');
    }
  };

  const handleConfirm = () => {
    const { year, month, day } = pickerValue;
    setBirthday(`${year}년 ${month}월 ${day}일`);
    setIsDrawerOpen(false);
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
          <div onClick={() => setIsDrawerOpen(true)} className="cursor-pointer">
            <Input
              value={birthday}
              placeholder="날짜를 선택해주세요."
              onChange={() => {}}
            />
          </div>
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

      <div className="px-6 pb-8 flex flex-col items-center text-gray-1000 text-md font-medium">

        <Button
          text="다음"
          variant={birthday && (isAgeVisible && isGenderVisible) ? 'active' : 'inactive'}
          onClick={handleSubmit}
          disabled={!birthday || !(isAgeVisible && isGenderVisible)}
        />
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="pb-6">
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
          <DrawerHeader className="flex justify-between px-6 pt-4">
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
