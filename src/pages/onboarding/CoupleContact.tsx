import React, { useState } from 'react';
import { ProgressHeader } from './components/progressheader';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerTrigger } from "@/components/ui/drawer";
import Input from '@/components/ui/input';

export const CoupleContact: React.FC = () => {
  // const [profileId, setProfileId] = useState<string>('');
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');

  const handleCopyClick = () => {
    // const textToCopy = profileId || 'asdflfjaenasl';
    const textToCopy = 'asdflfjaenasl';
    navigator.clipboard.writeText(textToCopy);
  };

  const handleInputSubmit = () => {
    if (!inputCode) {
      setError('초대 코드를 입력해주세요.');
      return;
    }
    console.log('입력된 코드:', inputCode);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ProgressHeader 
        onClose={() => {}} 
        progress={3/3} 
        title="커플 연결을 진행해주세요"
        highlight="커플 연결"
        subtitle="초대 코드를 통해 연결을 완료하고 우리만의 소중한 추억을 공유해보세요!"
      />
      
      <div className="px-6 flex-1">
        <div className="flex flex-col items-center justify-center mt-12">
          <div className="w-40 h-40 bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-gray-400">그래픽 넣기</span>
          </div>

          <div className="w-full">
            <p className="flex flex-col items-center text-gray-500 text-sm font-medium">초대 코드 복사하기</p>
            <div 
              className="w-full p-2 text-center text-2xl font-medium underline underline-offset-3 decoration-solid cursor-pointer"
              onClick={handleCopyClick}
            >
              {/* {profileId || 'asdflfjaenasl'} */}
              {'asdflfjaenasl'}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="pb-6 items-center text-center text-gray-900 text-sm font-medium">상대방에게서 전달받은 코드가 있나요?</p>
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              text="초대 코드 입력하기"
              variant="special"
            />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="px-6">
              <h2 className="text-md text-gray-900 font-medium mb-2">초대 코드 입력하기</h2>
              <Input
                value={inputCode}
                onChange={setInputCode}
                placeholder="초대 코드를 입력해주세요."
                status={error ? 'error' : undefined}
                onClear={() => {
                  setInputCode('');
                  setError('');
                }}
              />
              {error && (
                <div className="mt-2 text-sm text-red-0">
                  {error}
                </div>
              )}
              {inputCode && !error && (
                <div className="mt-0 mb-2 ml-1 text-sm text-red-0">
                  상대방에게 전달받은 초대 코드를 입력해주세요.
                </div>
              )}
            </DrawerHeader>
            <DrawerFooter className="p-4">
              <Button
                text="완료"
                variant="active"
                onClick={handleInputSubmit}
              />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
