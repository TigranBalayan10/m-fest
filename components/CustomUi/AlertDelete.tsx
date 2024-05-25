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
import { FaSpinner } from "react-icons/fa6";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";

interface AlertActionProps {
  itemId: string;
  title?: string;
  actionEndpoint: string;
  link?: string;
  actionName?: string;
  actionColor?: string;
  httpMethod: string;
}

export default function AlertAction({ title, itemId, actionEndpoint, actionName, actionColor, httpMethod, link }: AlertActionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/${actionEndpoint}/${itemId}`, {
        method: httpMethod,
      });
      if (response.ok) {
        if (httpMethod === "DELETE" && pathname === "/dashboard/inventory" || pathname === "/dashboard") {
          router.push("/dashboard");
        } else{
          router.push("/dashboard/inventory");
        }
      }
    } catch (error) {
      console.error(`Failed to ${actionName} item:`, error);
    }
    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {link === "link" && actionName === "Delete" ? <Button variant="link" className="text-red-500"> {actionName}</Button> : null}
        {link === "link" && actionName === "Archive" ? <Button variant="link" className="text-amber-500"> {actionName}</Button> : null}
        {!link && actionName === "Delete" ? <Button variant="destructive"> {actionName}</Button> : null}
        {!link && actionName === "Archive" ? <Button className={`bg-${actionColor} w-full md:w-auto`}> {actionName}</Button> : null}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want {actionName?.toLowerCase()}
            <span className={`text-${actionColor}`}> {title} </span>
            ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently {actionName?.toLowerCase()} the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className={`bg-${actionColor}`} onClick={handleAction}>
            {isLoading ? <FaSpinner className="animate-spin" /> : actionName}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
