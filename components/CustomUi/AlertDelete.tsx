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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter, usePathname } from "next/navigation";

interface AlertActionProps {
  itemId: string;
  title: string;
  actionEndpoint: string;
  actionName: string;
  actionColor: string;
  httpMethod: string;
}

export default function AlertAction({ title, itemId, actionEndpoint, actionName, actionColor, httpMethod }: AlertActionProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleAction = async () => {
    try {
      const response = await fetch(`/api/${actionEndpoint}/${itemId}`, {
        method: httpMethod,
      });
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error(`Failed to ${actionName} item:`, error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <h2 className={actionColor}>{actionName}</h2>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want {actionName.toLowerCase()}
            <span className={actionColor}> {title} </span>
            ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently {actionName.toLowerCase()} the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className={actionColor} onClick={handleAction}>
            {actionName.toUpperCase()}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
