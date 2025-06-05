interface EditInfoCardProps {
  title: string;
  onEdit?: () => void;
  children?: React.ReactNode;
}

export const EditInfoCard = ({ title, onEdit, children }: EditInfoCardProps) => {
  return (
    <div className="mx-5 my-3 mb-2 flex items-center justify-between rounded-lg bg-gray-50 p-4 py-5">
      <div className="text-md font-medium text-gray-900">{children ? children : title}</div>
      <button className="text-sm font-medium text-gray-500" onClick={onEdit} type="button">
        편집
      </button>
    </div>
  );
};
