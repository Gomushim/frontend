import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  InfoCard,
} from "@/shared/ui";
import { MouseEvent } from "react";

interface DeleteAlertProps {
  onDelete: (e: MouseEvent) => void;
}

export const DeleteAlert = (props: DeleteAlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <InfoCard.Option
          onClick={e => {
            e.stopPropagation();
          }}>
          삭제
        </InfoCard.Option>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-70">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-lg font-semibold">편지 삭제</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm font-normal text-gray-400">
            정말 편지를 삭제하시겠어요?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row !justify-center">
          <AlertDialogCancel
            className="w-[50%] bg-gray-200 pt-3 text-base font-semibold text-white hover:bg-gray-300 hover:text-white"
            onClick={e => e.stopPropagation()}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            className="hover:bg-gray-1000 w-[50%] bg-gray-900 pt-3 text-base font-semibold text-white hover:text-white"
            onClick={props.onDelete}>
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
