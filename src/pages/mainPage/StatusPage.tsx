import { useState } from 'react';
import EmotionSelector from './components/EmotionSelector';
import Textinput from '../../components/ui/textinput';
import { EmotionType } from '../../types/emotion';
import { Button } from '../../components/ui/button';

export const StatusPage = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | undefined>();
  const [message, setMessage] = useState('');

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
      /></div>
    </div>
  );
};