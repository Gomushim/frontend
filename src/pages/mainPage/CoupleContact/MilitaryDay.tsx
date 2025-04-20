import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import ProgressHeader from '../../../components/ui/progressheader';
import Button from '@/componenets/Button/Button';
import Input from '@/componenets/Input/Input';
import Picker from 'react-mobile-picker';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
} from '@/components/ui/drawer';

export const MilitaryDay: React.FC = () => {
  const [enlistmentDate, setEnlistmentDate] = useState<Date | null>(null);
  const [dischargeDate, setDischargeDate] = useState<Date | null>(null);
  const [activePicker, setActivePicker] = useState<'enlistment' | 'discharge' | null>(null);
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

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleNext = () => {
    if (enlistmentDate && dischargeDate) {
      navigate('/onboarding/couple-contact');
    }
  };

  const handleConfirm = () => {
    const { year, month, day } = pickerValue;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    if (activePicker === 'enlistment') {
      setEnlistmentDate(date);
    } else if (activePicker === 'discharge') {
      setDischargeDate(date);
    }
    setActivePicker(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-0">
      <ProgressHeader
        title="군 복무 기간을 입력해주세요"
        highlight="복무 기간"
        subtitle="입대일과 전역일을 정확히 입력해주세요."
        progress={2 / 3}
        onBack={() => console.log('뒤로가기')}
        onClose={() => console.log('닫기')}
      />

      <div className="flex-1 px-4 mt-6 space-y-6">
        <div>
          <label className="block text-gray-1000 text-md font-medium">입대일</label>
          <Input
            value={enlistmentDate ? formatDate(enlistmentDate) : ''}
            onChange={() => setActivePicker('enlistment')}
            placeholder="입대일을 선택해주세요."
            status={enlistmentDate ? 'active' : 'inactive'}
            onClear={() => setEnlistmentDate(null)}
            onFocus={() => setActivePicker('enlistment')}
          />
        </div>

        <div>
          <label className="block text-gray-1000 text-md font-medium">전역일</label>
          <Input
            value={dischargeDate ? formatDate(dischargeDate) : ''}
            onChange={() => setActivePicker('discharge')}
            placeholder="전역일을 선택해주세요."
            status={dischargeDate ? 'active' : 'inactive'}
            onClear={() => setDischargeDate(null)}
            onFocus={() => setActivePicker('discharge')}
          />
        </div>
      </div>

      <div className="py-1 flex justify-center mt-auto">
        <Button
          text="다음"
          variant={enlistmentDate && dischargeDate ? 'active' : 'inactive'}
          disabled={!enlistmentDate || !dischargeDate}
          onClick={handleNext}
        />
      </div>

      <Drawer open={!!activePicker} onOpenChange={(open) => !open && setActivePicker(null)}>
        <DrawerContent className="pb-6">
          <DrawerHeader className="flex justify-between px-6 pt-4">
            
          </DrawerHeader>
          <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-[320px] h-[200px] flex items-center justify-center">
              <Picker value={pickerValue} onChange={setPickerValue} height={180} itemHeight={44} className="w-full">
                <Picker.Column name="year" className="flex-1">
                  {years.map(year => (
                    <Picker.Item key={year} value={year}>
                      {({ selected }) => (
                        <div className={`w-full text-center ${selected ? 'text-black font-semibold text-lg' : 'text-gray-400'}`}>
                          {year}
                        </div>
                      )}
                    </Picker.Item>
                  ))}
                </Picker.Column>
                <Picker.Column name="month" className="flex-1">
                  {months.map(month => (
                    <Picker.Item key={month} value={month}>
                      {({ selected }) => (
                        <div className={`w-full text-center ${selected ? 'text-black font-semibold text-lg' : 'text-gray-400'}`}>
                          {month}
                        </div>
                      )}
                    </Picker.Item>
                  ))}
                </Picker.Column>
                <Picker.Column name="day" className="flex-1">
                  {days.map(day => (
                    <Picker.Item key={day} value={day}>
                      {({ selected }) => (
                        <div className={`w-full text-center ${selected ? 'text-black font-semibold text-lg' : 'text-gray-400'}`}>
                          {day}
                        </div>
                      )}
                    </Picker.Item>
                  ))}
                </Picker.Column>
              </Picker>
            </div>
          </div>
          <Button
              text="확인"
              variant="active"
              onClick={handleConfirm}
              className="w-full"
            />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
