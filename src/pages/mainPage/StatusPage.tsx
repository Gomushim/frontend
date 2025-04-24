import { useState } from 'react';
import { EmotionSelector } from '@/features/ma-section';
import { Textinput } from '@/shared/ui';
import { EmotionType } from '@/entities/types/emotion';
import { Button } from '@/shared/ui';
import { useCoupleStore } from '@/store/coupleStore';
import { useNavigate } from 'react-router';

export const StatusPage = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | undefined>();
  const [message, setMessage] = useState('');
  const { isConnected, isInitialized } = useCoupleStore();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!selectedEmotion) {
      alert('감정을 선택해주세요!');
      return;
    }
    if (!message) {
      alert('메시지를 입력해주세요!');
      return;
    }
    // TODO: 서버로 데이터 전송
    console.log({ emotion: selectedEmotion, message });
  };

  if (!isConnected) {
    return (
      <div className="flex-1 flex-col h-full bg-white p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">커플 연결이 필요합니다</h1>
        <Button
          onClick={() => navigate('/onboarding/couple-contact')}
          text="커플 연결하기"
          variant="active"
        />
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="flex-1 flex-col h-full bg-white p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">초기 설정이 필요합니다</h1>
        <Button
          onClick={() => navigate('/onboarding/firstmeet')}
          text="초기 설정하기"
          variant="active"
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex-col h-full bg-white">
      <EmotionSelector
        selectedEmotion={selectedEmotion}
        onSelect={setSelectedEmotion}
      />
      <div className="p-4">
        <p className="text-gray-900 text-xl font-semibold pb-2">상태 메시지</p>
        <Textinput
          value={message}
          onChange={setMessage}
          placeholder="나의 상태를 연인에게 알려주세요"
          maxLength={15}
        />
      </div>
      <div className="p-4">
        <Button
          onClick={handleSubmit}
          text="다음"
          variant="active"
        />
      </div>
    </div>
  );
};