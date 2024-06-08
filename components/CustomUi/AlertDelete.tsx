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
import { usePathname } from "next/navigation";
import { AiFillDelete } from "react-icons/ai";
import { useSWRConfig } from 'swr';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

interface AlertActionProps {
  itemId: string;
  title?: string;
  actionEndpoint: string;
  link?: string;
  actionName?: string;
  actionColor?: string;
  httpMethod: string;
  getEndpoint?: string;
  children?: React.ReactNode;
}

export default function AlertAction({ title, itemId, actionEndpoint, actionName, actionColor, httpMethod, link, getEndpoint }: AlertActionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { toast } = useToast()


  const handleAction = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/${actionEndpoint}/${itemId}`, {
        method: httpMethod,
      });
      if (response.ok) {
        if (httpMethod === "DELETE" && pathname === "/dashboard/inventory" || pathname === "/dashboard") {
          mutate("/api/inventory");
        } else if (httpMethod === "DELETE" && pathname === "/dashboard/archive") {
          mutate("/api/archive");
        } else if (httpMethod === "DELETE" && pathname === "/dashboard/customers") {
          mutate("/api/get-customers");
        } else if (httpMethod === "PUT" && pathname === "/dashboard/inventory") {
          mutate(`/api/archive-inventory/${itemId}`);
        } else {
          mutate("/api/archive")
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
        {link === "link" && httpMethod === "DELETE" ? <Button variant="link" className="text-red-500"> {actionName}</Button> : null}
        {link === "link" && httpMethod === "PUT" ? <Button variant="link" className="text-amber-500"> {actionName}</Button> : null}
        {!link && pathname === "/dashboard/customers" && httpMethod === "DELETE" ? <Button variant="destructive" size="icon">
          <AiFillDelete />
        </Button> : null}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want {actionName?.toLowerCase()}
            <span > {title} </span>
            ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently {actionName?.toLowerCase()} the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} className={`${actionColor}`} onClick={handleAction}>
            {isLoading ? <FaSpinner className="animate-spin" /> : actionName}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
