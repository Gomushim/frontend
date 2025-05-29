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
} from "@/shared/ui";
import { MouseEvent } from "react";

interface DeleteAlertProps {
  children: React.ReactNode;
  onDelete: (e: MouseEvent) => void;
  title: string;
  description: string;
  buttonText: string;
  cancelText: string;
}

export const DeleteAlert = (props: DeleteAlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
      <AlertDialogContent className="w-70">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-lg font-semibold">{props.title}</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm font-normal text-gray-400">
            {props.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row !justify-center">
          <AlertDialogCancel
            className="w-[50%] bg-gray-200 p-3 text-base font-semibold text-white hover:bg-gray-300 hover:text-white"
            onClick={e => e.stopPropagation()}>
            {props.cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            className="hover:bg-gray-1000 w-[50%] bg-gray-900 p-3 text-base font-semibold text-white hover:text-white"
            onClick={props.onDelete}>
            {props.buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
