import React, { useState } from "react";
import {
  Input,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTrigger,
  ProgressHeader,
} from "@/shared/ui";

export const CoupleContact: React.FC = () => {
  // const [profileId, setProfileId] = useState<string>('');
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");

  const handleCopyClick = () => {
    // const textToCopy = profileId || 'asdflfjaenasl';
    const textToCopy = "asdflfjaenasl";
    navigator.clipboard.writeText(textToCopy);
  };

  const handleInputSubmit = () => {
    if (!inputCode) {
      setError("초대 코드를 입력해주세요.");
      return;
    }
    console.log("입력된 코드:", inputCode);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ProgressHeader
        onClose={() => {}}
        progress={3 / 3}
        title="커플 연결을 진행해주세요"
        highlight="커플 연결"
        subtitle="초대 코드를 통해 연결을 완료하고 우리만의 소중한 추억을 공유해보세요!"
      />

      <div className="flex-1 px-6">
        <div className="mt-12 flex flex-col items-center justify-center">
          <div className="mb-8 flex h-40 w-40 items-center justify-center rounded-lg bg-gray-200">
            <span className="text-gray-400">그래픽 넣기</span>
          </div>

          <div className="w-full">
            <p className="flex flex-col items-center text-sm font-medium text-gray-500">초대 코드 복사하기</p>
            <div
              className="w-full cursor-pointer p-2 text-center text-2xl font-medium underline decoration-solid underline-offset-3"
              onClick={handleCopyClick}>
              {/* {profileId || 'asdflfjaenasl'} */}
              {"asdflfjaenasl"}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="items-center pb-6 text-center text-sm font-medium text-gray-900">
          상대방에게서 전달받은 코드가 있나요?
        </p>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="special">초대 코드 입력하기</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="px-6">
              <h2 className="text-md mb-2 font-medium text-gray-900">초대 코드 입력하기</h2>
              <Input
                value={inputCode}
                onChange={setInputCode}
                placeholder="초대 코드를 입력해주세요."
                status={error ? "error" : undefined}
                onClear={() => {
                  setInputCode("");
                  setError("");
                }}
              />
              {error && <div className="text-red-0 mt-2 text-sm">{error}</div>}
              {inputCode && !error && (
                <div className="text-red-0 mt-0 mb-2 ml-1 text-sm">상대방에게 전달받은 초대 코드를 입력해주세요.</div>
              )}
            </DrawerHeader>
            <DrawerFooter className="p-4">
              <Button variant="active" onClick={handleInputSubmit}>
                완료
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
