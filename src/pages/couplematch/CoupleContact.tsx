import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import {
  Input,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTrigger,
} from "@/shared/ui";
import { coupleConnectQueries } from "@/entities/coupleconnect/service";
import checkcircle from "@/assets/images/checkcircle.svg";
import CloseIcon from "@/assets/images/close.svg";
import coupleConnectAnimation from "@/assets/json/coupleconnect.json";

export const CoupleContact: React.FC = () => {
  const [coupleCode, setCoupleCode] = useState<string>("");
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleGenerateCode = async () => {
    try {
      setIsLoading(true);
      const response = await coupleConnectQueries.generateCoupleCode();
      if (response && response.result) {
        setCoupleCode(response.result);
      } else {
        setError("코드 생성에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("코드 생성 에러:", error);
      setError("코드 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateCode();
  }, []);

  const handleCopyClick = () => {
    if (coupleCode) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleInputSubmit = async () => {
    if (!inputCode) {
      setError("초대 코드를 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      await coupleConnectQueries.connectCouple({ coupleCode: inputCode });
      navigate("/");
    } catch (error) {
      setError("커플 연결에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="bg-white px-4 pt-6 pb-4">
        <div className="mb-3 flex items-center justify-end">
          <button onClick={() => navigate("/mainpage")}>
            <img src={CloseIcon} alt="닫기" className="h-6 w-6" />
          </button>
        </div>

        <h1 className="text-left text-3xl font-bold text-gray-900">
          <span className="text-green-500">커플 연결</span>을 진행해주세요
        </h1>
        <p className="text-md font-regular text-left text-gray-500">
          초대 코드를 통해 연결을 완료하고<br/>우리만의 소중한 추억을 공유해보세요!
        </p>
      </div>

      <div className="flex-1 ">
        <div className=" flex flex-col items-center justify-center">
          <div className="flex h-75 w-75 items-center justify-center overflow-hidden">
            <Lottie animationData={coupleConnectAnimation} loop={true}  />
          </div>

          <div className="w-full">
            <p className="flex flex-col items-center text-sm font-medium text-gray-500">초대 코드 복사하기</p>
            <div
              className="w-full cursor-pointer p-2 text-center text-2xl font-medium underline decoration-solid underline-offset-3"
              onClick={handleCopyClick}>
              {isLoading ? "코드 생성 중..." : coupleCode || "코드 생성 실패"}
            </div>
            {copied && (
              <div className="mt-2 flex w-full items-center justify-center">
                <div className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500">
                  <img src={checkcircle} alt="check" className="mr-1 h-4 w-4" />
                  복사되었습니다.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="items-center pb-6 text-center text-sm font-medium text-gray-900">
          상대방에게서 전달받은 코드가 있나요?
        </p>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="special" size="onicon">초대 코드 입력하기</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="px-6">
              <h2 className="text-2xl mb-2 font-semibold text-gray-900">초대 코드 입력하기</h2>
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
                <div className="mt-0 mb-2 ml-1 text-sm">상대방에게 전달받은 초대 코드를 입력해주세요.</div>
              )}
            </DrawerHeader>
            <DrawerFooter className="p-4">
              <Button variant="active" size="onicon" onClick={handleInputSubmit} disabled={isLoading}>
                {isLoading ? "연결 중..." : "완료"}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
