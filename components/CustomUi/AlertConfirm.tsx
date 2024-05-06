"use client"


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";

interface AlertConfirmProps {
    title: string;
    description: string;
}


const AlertConfirm = ({ title, description }: AlertConfirmProps) => {
    const router = useRouter();
    return (
        <AlertDialog defaultOpen>
            <AlertDialogContent>
                <AlertDialogHeader>
                    {title === "Success" ? (
                        <AlertDialogTitle className="text-green-500">{title}</AlertDialogTitle>
                    ) : (
                        <AlertDialogTitle className="text-red-500">{title}</AlertDialogTitle>
                    )}
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {title === "Success" ? (
                        <AlertDialogAction onClick={() => router.push("/dashboard")}>OK</AlertDialogAction>
                    ) : (
                        <AlertDialogAction className="text-red-500">Close</AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertConfirm