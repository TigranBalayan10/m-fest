import React from 'react';
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
} from "@/components/ui/alert-dialog"

interface AlertProps {
    title: string;
    description: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onOkClick: () => void; // New prop
}

const Alert: React.FC<AlertProps> = ({ title, description, isOpen, setIsOpen, onOkClick }) => {
    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <>
            {isOpen && (
                <AlertDialog>
                    <AlertDialogTrigger>
                        {/* This is required by some libraries but can be an empty fragment */}
                        <></>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{title}</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                            {description}
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogAction onClick={onOkClick}>OK</AlertDialogAction> {/* Use the prop here */}
                            <AlertDialogCancel onClick={handleClose}>Close</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}

export default Alert;