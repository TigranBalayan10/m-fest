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
import { AiOutlineDelete } from "react-icons/ai";
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
        <h2 className="text-red-500">Delete</h2>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want delete
            <span className=" text-red-500"> {title} </span>
            ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the car
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleDelete}>
            DELETE
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
