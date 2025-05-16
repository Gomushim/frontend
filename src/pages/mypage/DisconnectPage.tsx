import React from "react";
import { MyHeader } from "@/features/mypage";
import { Button } from "@/shared/ui/button";
import ShoesImg from "@/assets/images/shoes.svg";
import { useNavigate } from "react-router";
import { DisconnectModal } from "@/features/mypage/ui/DisconnectModal";
import { useToggle } from "@/shared/hooks/useToggle";

export const DisconnectPage: React.FC = () => {
  const navigate = useNavigate();
  const { isToggle: isModalOpen, onOpenToggle: openModal, onCloseToggle: closeModal } = useToggle();

  return (
    <div className="flex h-screen flex-col bg-white">
      <MyHeader title="커플 연결 끊기" className="pb-10" />
      <div className="flex flex-1 flex-col items-center">
        <div className="text-center">
          <h2 className="mb-1 text-3xl font-bold text-gray-900">그동안의 데이터는 모두 사라집니다</h2>
          <p className="text-md font-regular text-gray-500">정말 커플 연결을 끊으시겠어요?</p>
        </div>
        <img src={ShoesImg} alt="신발" className="h-80 w-64" />
      </div>
      <div className="p-4">
        <div className="flex gap-3">
          <Button className="flex-1" variant="special" size="onicon" onClick={openModal}>
            연결 끊기
          </Button>
          <Button onClick={() => navigate("/mypage/setting")} className="flex-1" variant="active" size="onicon">
            취소
          </Button>
        </div>
      </div>
      <DisconnectModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
};
