import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProgressHeader } from './components/progressheader';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { DatePickerDrawer } from '@/components/ui/datepicker';
import { formatDate } from '@/utils/formatdate';

export const MilitaryDay: React.FC = () => {
  const [enlistmentDate, setEnlistmentDate] = useState<Date | null>(null);
  const [dischargeDate, setDischargeDate] = useState<Date | null>(null);

  const navigate = useNavigate();

  const handleNext = () => {
    if (enlistmentDate && dischargeDate) {
      navigate('/onboarding/couple-contact');
    }
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
            <DatePickerDrawer
              onConfirm={setEnlistmentDate}
            >
              <Input
                value={enlistmentDate ? formatDate(enlistmentDate) : ''}
                onChange={() => {}}
                placeholder="입대일을 선택해주세요."
                status={enlistmentDate ? 'active' : 'inactive'}
                onClear={() => setEnlistmentDate(null)}
              />
            </DatePickerDrawer>
          </div>

          <div>
            <label className="block text-gray-1000 text-md font-medium mb-2">전역일</label>
            <DatePickerDrawer
              onConfirm={setDischargeDate}
            >
              <Input
                value={dischargeDate ? formatDate(dischargeDate) : ''}
                onChange={() => {}}
                placeholder="전역일을 선택해주세요."
                status={dischargeDate ? 'active' : 'inactive'}
                onClear={() => setDischargeDate(null)}
              />
            </DatePickerDrawer>
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
    </div>
  );
};
