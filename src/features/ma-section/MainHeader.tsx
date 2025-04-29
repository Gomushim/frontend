interface MainHeaderProps {
  mainTitle: string;
  buttonText: string;
  onClick: () => void;
  disabled?: boolean;
}

export const MainHeader = ({ mainTitle, buttonText, onClick, disabled = false }: MainHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">{mainTitle}</h2>
      <button
        onClick={onClick}
        disabled={disabled}
        className={"text-sm font-medium text-gray-700"}
      >
        {buttonText} 
      </button>
    </div>
  );
};