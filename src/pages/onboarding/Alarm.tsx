import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import ProgressHeader from '@/components/ui/progressheader';
import Button from '@/componenets/Button/Button';

export const Alarm: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  const handleSubmit = () => {
    if (selectedMessages.length > 0) {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <ProgressHeader
        title="멀리 있어도, 마음은 늘 가까이"
        highlight="마음은 늘 가까이"
        subtitle="문득 생각날 때, 당신의 마음을 전해드릴게요."
        progress={1}
        onBack={() => navigate(-1)}
        onClose={() => navigate('/')}
      />

      <div className="flex-1" />

      <div className="px-6 pb-8 flex flex-col items-center text-gray-1000 text-md font-medium">
        <Button
          text="알림을 받을게요"
          variant= 'active' 
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Alarm;
