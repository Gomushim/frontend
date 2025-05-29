import React from "react";
import { useDeleteMyData } from "@/entities/delete_couple/mutation";
import { useNavigate } from "react-router";

interface DisconnectModalProps {
  open: boolean;
  onClose: () => void;
}

export const DisconnectModal: React.FC<DisconnectModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { mutate: deleteMyData } = useDeleteMyData();

  const handleConfirm = () => {
    deleteMyData(undefined, {
      onSuccess: () => {
        onClose();
        navigate("/login");
      },
    });
  };

  if (!open) return null;
  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl px-5 py-5  w-80 flex flex-col items-center shadow-lg">
        <div className="text-xl font-bold text-gray-900 mb-2">커플 연결 해지</div>
        <div className="text-sm text-gray-500 font-regular mb-6">상대방과의 연결이 끊어졌어요.</div>
        <button
          className="w-full py-3 rounded-md bg-gray-900 text-white font-semibold"
          onClick={handleConfirm}
        >
          확인했어요
        </button>
      </div>
    </div>
  );
}; 