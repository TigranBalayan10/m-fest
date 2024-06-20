"use client";

import { FaSpinner } from "react-icons/fa6";
import { useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { AiFillDelete } from "react-icons/ai";
import { useSWRConfig } from 'swr';
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast";

interface AlertActionProps {
  itemId: string;
  title?: string;
  actionEndpoint: string;
  link?: string;
  actionName?: string;
  httpMethod: string;
  getEndpoint?: string;
  children?: React.ReactNode;
}

export default function AlertAction({ title, itemId, actionEndpoint, actionName, httpMethod, link, getEndpoint }: AlertActionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const { toast } = useToast();


  const handleAction = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/${actionEndpoint}/${itemId}`, {
        method: httpMethod,
      });
      if (response.ok) {
        if (httpMethod === "DELETE") {
          if (pathname === "/dashboard/inventory" || pathname === "/dashboard") {
            await mutate("/api/inventory");
            toast({
              variant: "success",
              title: "Success",
              description: `${title} deleted successfully.`,
            });
            setIsOpen(false);
          } else if (pathname === "/dashboard/archive") {
            await mutate("/api/archive");
            setIsOpen(false);
            toast({
              variant: "success",
              title: "Success",
              description: `${title} deleted successfully.`,
            });
          } else if (pathname === "/dashboard/financing-requests") {
            await mutate("/api/get-financing-requests");
            setIsOpen(false);
            toast({
              variant: "success",
              title: "Success",
              description: `${title} deleted successfully.`,
            });
          } else if (pathname === "/dashboard/customers") {
            await mutate("/api/get-customers");
            toast({
              variant: "success",
              title: "Success",
              description: "Customer deleted successfully.",
            });
            setIsOpen(false);
          }
        } else if (httpMethod === "PUT" && pathname === "/dashboard/inventory" || pathname === "/dashboard") {
          await mutate(`/api/${getEndpoint}`);
          toast({
            variant: "archived",
            title: "Success",
            description: `${title} archived successfully.`,
          });
          setIsOpen(false); // Close the dialog after archiving
        }
        setIsLoading(false);
      } else {
        throw new Error(`Failed to ${actionName} item: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Failed to ${actionName} item:`, error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${actionName} item. Please try again.`,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        {link === "link" && httpMethod === "DELETE" ? <Button variant="link" className="text-red-500 p-2"> {actionName}</Button> : null}
        {link === "link" && httpMethod === "PUT" ? <Button variant="link" className="text-amber-500 p-2"> {actionName}</Button> : null}
        {!link && pathname === "/dashboard/customers" && httpMethod === "DELETE" ? <Button variant="destructive" size="icon">
          <AiFillDelete />
        </Button> : null}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{actionName}</DialogTitle>
          <DialogDescription>
            Are you absolutely sure you want {actionName?.toLowerCase()}
            <span > {title} </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <DialogClose >Cancel</DialogClose>
          {isLoading ? (
            <Button
              {...(httpMethod === "DELETE" ? { variant: "destructive" } : { className: "bg-amber-600 hover:bg-amber-500" })}
              disabled>
              <FaSpinner className="animate-spin mr-2" /> {actionName}
            </Button>
          ) : (
            <Button
              {...(httpMethod === "DELETE" ? { variant: "destructive" } : { className: "bg-amber-600 hover:bg-amber-500" })}
              onClick={handleAction}
            >
              {actionName}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

