interface MainHeaderProps {
  mainTitle: string;
  buttonText?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const MainHeader = ({ 
  mainTitle, 
  buttonText, 
  onClick, 
  disabled = false
}: MainHeaderProps) => {
  return (
    <div className="flex justify-between items-center mt-5 ">
      <h2 className="text-gray-900 text-xl font-bold">{mainTitle}</h2>
      {buttonText && onClick && (
        <button
          onClick={onClick}
          disabled={disabled}
          className="text-sm font-medium text-gray-700 flex items-center gap-1"
        >
          {buttonText}
          <span>{">"}</span>
        </button>
      )}
    </div>
  );
};