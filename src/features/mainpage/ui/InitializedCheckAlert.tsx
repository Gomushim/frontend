import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/shared/ui";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { useNavigate } from "react-router";

export const InitializedCheckAlert = () => {
  const navigate = useNavigate();

  const handleIsInitializedCheck = () => {
    navigate("/onboarding/firstmeet", {
      state: { previousPath: window.location.pathname },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex cursor-pointer items-center gap-1 text-sm font-medium text-gray-700">
          더보기
          <span>{">"}</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-80">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-lg font-semibold">초기 설정을 해주세요</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-xs font-normal text-gray-400">
            초기 설정을 하면 서비스를 이용할 수 있어요!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row !justify-center">
          <AlertDialogAction
            className="hover:bg-gray-1000 w-[50%] bg-gray-900 p-3 text-sm font-semibold text-white hover:text-white"
            onClick={handleIsInitializedCheck}>
            초기 설정 하러가기
          </AlertDialogAction>
          <AlertDialogCancel className="w-[50%] bg-gray-200 p-3 text-sm font-semibold text-white hover:bg-gray-300 hover:text-white">
            취소
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
