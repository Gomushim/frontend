import React, { useState } from "react";
import { MyHeader } from "@/features/mypage";
import { Button } from "@/shared/ui/button";
import ShoesImg from "@/assets/images/shoes.svg";
import { useNavigate } from "react-router";
import { DisconnectModal } from "@/features/mypage/ui/DisconnectModal";

export const DisconnectPage: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDisconnect = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <MyHeader title="커플 연결 끊기" />
      <div className="flex-1 flex flex-col items-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">
            정말 커플 연결을 끊으시겠어요?
          </h2>
          <p className="text-gray-500 text-md font-regular">
            그룹상의 데이터는 모두 사라집니다.
          </p>
        </div>
        <img src={ShoesImg} alt="신발" className="w-64 h-80 " />
      </div>
      <div className="p-4">
        <div className="flex gap-3">
          <Button className="flex-1" variant="special" size="onicon" onClick={handleDisconnect}>
            연결 끊기
          </Button>
          <Button onClick={() => navigate("/mypage/setting")}
          className="flex-1" variant="active" size="onicon">
            취소
          </Button>
        </div>
      </div>
      <DisconnectModal open={open} onClose={handleCloseModal} />
    </div>
  );
};

