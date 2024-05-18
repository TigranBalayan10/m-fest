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
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa6";
import { useState } from "react";

interface AlertActionProps {
  itemId: string;
  title?: string;
  actionEndpoint: string;
  actionName?: string;
  actionColor?: string;
  httpMethod: string;
  children: React.ReactNode;
}

export default function AlertAction({ title, itemId, actionEndpoint, actionName, actionColor, httpMethod, children }: AlertActionProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want {actionName?.toLowerCase()}
            <span className={actionColor}> {title} </span>
            ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently {actionName?.toLowerCase()} the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className={actionColor} onClick={handleAction}>
            {isLoading ? <FaSpinner className="animate-spin" /> : actionName?.toUpperCase()}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
