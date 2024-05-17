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
        <Button variant="outline" size="icon">
          <AiOutlineDelete className="h-6 w-6 text-amber-700"/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to move
            <span className=" text-amber-700"> {title} </span>
            to your inventory archive?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Car data will be archived. You can access your archive from the sidebar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form className="flex justify-end">
            <AlertDialogAction className="bg-amber-500" onClick={handleDelete}>
              ARCHIVE
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
