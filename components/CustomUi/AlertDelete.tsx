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
import { Button } from "@/components/ui/button";
import { OctagonX } from "lucide-react";
import { useRouter } from "next/navigation";

interface AlertDeleteProps {
  carId: string;
  title: string;
}

export default function AlertDelete({ title, carId }: AlertDeleteProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/delete-inventory/${carId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <OctagonX color="red" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete
            <span className=" text-red-500"> {title} </span>
            from your inventory?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete car data
            from servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form className="flex justify-end">
            <AlertDialogAction className="bg-red-500" onClick={handleDelete}>
              DELETE
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
