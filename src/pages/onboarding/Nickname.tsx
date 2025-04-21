import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProgressHeader } from './components/progressheader';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';

export const Nickname: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (nickname.trim()) {
      navigate('/onboarding/birthday');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <ProgressHeader
        title="사용할 닉네임을 입력해주세요"
        highlight="닉네임임"
        subtitle="3글자 이내로 입력이 가능해요."
        progress={1/3}
        onBack={() => navigate(-1)}
        onClose={() => navigate('/')}
      />
      
      <div className="flex-1 px-4">
        <div className="mt-4">
          <Input
            value={nickname}
            onChange={setNickname}
            placeholder="클릭하여 입력해주세요"
            onClear={() => setNickname('')}
          />
        </div>
      </div>

      <div className="p-4">
        <Button
          text="다음"
          variant={nickname.trim() ? 'active' : 'inactive'}
          onClick={handleSubmit}
          disabled={!nickname.trim()}
        />
      </div>
    </div>
  );
};