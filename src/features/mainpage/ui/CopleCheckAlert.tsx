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

export const CopleCheckAlert = () => {
  const navigate = useNavigate();

  const handleIsConnectedCheck = () => {
    navigate("/onboarding/couple-contact", {
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
          <AlertDialogTitle className="text-center text-lg font-semibold">커플 연결을 해주세요</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-xs font-normal text-gray-400">
            서로의 초대코드를 입력하면 커플 연결이 완료돼요!
            <br />
            연결은 계정당 한 번만 가능해요
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row !justify-center">
          <AlertDialogAction
            className="hover:bg-gray-1000 w-[50%] bg-gray-900 p-3 text-sm font-semibold text-white hover:text-white"
            onClick={handleIsConnectedCheck}>
            연결하러가기
          </AlertDialogAction>
          <AlertDialogCancel className="w-[50%] bg-gray-200 p-3 text-sm font-semibold text-white hover:bg-gray-300 hover:text-white">
            취소
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
