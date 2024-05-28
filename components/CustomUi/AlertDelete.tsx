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
import useSWR from "swr";
import { fetcher } from "@/lib/swrFetcher";
import { AiFillDelete } from "react-icons/ai";

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
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useSWR(`/api/${getEndpoint}`, fetcher);

  const handleAction = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/${actionEndpoint}/${itemId}`, {
        method: httpMethod,
      });
      if (response.ok) {
        if (httpMethod === "DELETE" && pathname === `/dashboard/inventory/${itemId}` || pathname === "/dashboard") {
          router.push("/dashboard");
        } else {
          mutate();
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
        {!link && httpMethod === "DELETE" && pathname === "/dashboard" || pathname === "/dashboard/inventory" ? <Button variant="destructive"> {actionName}</Button> : null}
        {!link && httpMethod === "PUT" ? <Button className={`${actionColor}`}> {actionName}</Button> : null}
        {pathname === "/dashboard/customers" && httpMethod === "DELETE" ? <Button variant="destructive" size="icon">
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
          <AlertDialogAction className={`${actionColor}`} onClick={handleAction}>
            {isLoading ? <FaSpinner className="animate-spin" /> : actionName}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
