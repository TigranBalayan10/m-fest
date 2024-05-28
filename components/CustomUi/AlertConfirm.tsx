"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";


interface AlertConfirmProps {
  title: string;
  description: string;
  rerouteHref?: string;
}

const AlertConfirm = ({
  title,
  description,
  rerouteHref,
}: AlertConfirmProps) => {
  const router = useRouter();
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title.includes("Success") || title === "Success" ? (
            <AlertDialogTitle className="text-green-500">
              {title}
            </AlertDialogTitle>
          ) : (
            <AlertDialogTitle className="text-red-500">
              {title}
            </AlertDialogTitle>
          )}
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {title.includes("Success") || title === "Success" ? (
            <AlertDialogAction className="bg-green-700 hover:bg-green-700/80" onClick={() => {
              if (rerouteHref) {
                router.push(rerouteHref);
              }
            }}>
              OK
            </AlertDialogAction>
          ) : (
            <AlertDialogAction className="text-red-500" onClick={() => {
              if (rerouteHref) {
                router.push(rerouteHref);
              }
            }}>
              Close
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertConfirm;
