interface MainHeaderProps {
  mainTitle: string;
  buttonText?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const MainHeader = ({ mainTitle, buttonText, onClick, disabled = false }: MainHeaderProps) => {
  return (
    <div className="mt-5 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-900">{mainTitle}</h2>
      {buttonText && onClick && (
        <button
          onClick={onClick}
          disabled={disabled}
          className="flex cursor-pointer items-center gap-1 text-sm font-medium text-gray-700">
          {buttonText}
          <span>{">"}</span>
        </button>
      )}
    </div>
  );
};
