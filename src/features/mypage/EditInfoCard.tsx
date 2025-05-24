import React from "react";

interface EditInfoCardProps {
  title: string;
  onEdit?: () => void;
  children?: React.ReactNode;
}

export const EditInfoCard: React.FC<EditInfoCardProps> = ({ title, onEdit, children }) => {
  return (
    <div className="mx-5 my-3 py-5 bg-gray-50 rounded-lg p-4 flex items-center justify-between mb-2">
      <div className="text-gray-900 text-md font-medium">
        {children ? children : title}
      </div>
      <button
        className="text-gray-500 text-sm font-medium"
        onClick={onEdit}
        type="button"
      >
        편집
      </button>
    </div>
  );
};