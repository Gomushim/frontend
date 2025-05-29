import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ open, onClose, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    onLogout();
    navigate("/login");
  };

  if (!open) return null;
  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl px-5 py-5 w-80 flex flex-col items-center shadow-lg">
        <div className="text-xl font-semibold text-gray-900 mb-2">로그아웃</div>
        <div className="text-sm text-gray-400 font-regular mb-6">정말 로그아웃 하시겠어요?</div>
        <div className="flex w-full gap-5">
          <button
            className="flex-1 py-3 rounded-md bg-gray-200 text-gray-0 font-semibold font-medium "
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="flex-1 py-3 rounded-md bg-gray-900 text-gray-0 font-semibold font-medium "
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}; 