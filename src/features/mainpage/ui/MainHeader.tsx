import { CopleCheckAlert } from "./CopleCheckAlert";
import { InitializedCheckAlert } from "./InitializedCheckAlert";

interface MainHeaderProps {
  mainTitle: string;
  buttonText?: string;
  onClick?: () => void;
  disabled?: boolean;
  isConnected?: boolean;
  isInitialized?: boolean;
}

export const MainHeader = ({
  mainTitle,
  buttonText,
  onClick,
  disabled = false,
  isConnected,
  isInitialized,
}: MainHeaderProps) => {
  return (
    <div className="mt-5 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-900">{mainTitle}</h2>
      {isInitialized && isConnected && buttonText && onClick && (
        <button
          onClick={onClick}
          disabled={disabled}
          className="flex cursor-pointer items-center gap-1 text-sm font-medium text-gray-700">
          {buttonText}
          <span>{">"}</span>
        </button>
      )}
      {!isConnected && <CopleCheckAlert />}
      {isConnected && !isInitialized && <InitializedCheckAlert />}
    </div>
  );
};
