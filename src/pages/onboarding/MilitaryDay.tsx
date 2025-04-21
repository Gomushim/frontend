import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import ProgressHeader from '../../components/ui/progressheader';
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const today = new Date();
  const years = Array.from({ length: 100 }, (_, i) => String(today.getFullYear() - i));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

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

  const handleDateClick = (type: 'enlistment' | 'discharge') => {
    setActivePicker(type);
    setIsDrawerOpen(true);
  };

  const handleConfirm = () => {
    const { year, month, day } = pickerValue;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    if (activePicker === 'enlistment') {
      setEnlistmentDate(date);
    } else if (activePicker === 'discharge') {
      setDischargeDate(date);
    }
    setIsDrawerOpen(false);
    setActivePicker(null);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <ProgressHeader
        title="군 복무 기간을 입력해주세요"
        highlight="복무 기간"
        subtitle="입대일과 전역일을 정확히 입력해주세요."
        progress={2 / 3}
        onBack={() => navigate(-1)}
        onClose={() => navigate('/')}
      />

      <div className="flex-1 px-4">
        <div className="mt-4 space-y-6">
          <div>
            <label className="block text-gray-1000 text-md font-medium mb-2">입대일</label>
            <div onClick={() => handleDateClick('enlistment')} className="cursor-pointer">
              <Input
                value={enlistmentDate ? formatDate(enlistmentDate) : ''}
                onChange={() => {}}
                placeholder="입대일을 선택해주세요."
                status={enlistmentDate ? 'active' : 'inactive'}
                onClear={() => setEnlistmentDate(null)}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-1000 text-md font-medium mb-2">전역일</label>
            <div onClick={() => handleDateClick('discharge')} className="cursor-pointer">
              <Input
                value={dischargeDate ? formatDate(dischargeDate) : ''}
                onChange={() => {}}
                placeholder="전역일을 선택해주세요."
                status={dischargeDate ? 'active' : 'inactive'}
                onClear={() => setDischargeDate(null)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Button
          text="다음"
          variant={enlistmentDate && dischargeDate ? 'active' : 'inactive'}
          disabled={!enlistmentDate || !dischargeDate}
          onClick={handleNext}
        />
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent >
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
    </div>
  );
};
