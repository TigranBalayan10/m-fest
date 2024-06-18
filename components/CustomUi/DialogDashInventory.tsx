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
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useSWRConfig } from "swr";
import { FaSpinner } from "react-icons/fa6";


interface DialogDashInventoryProps {
    action: "Delete" | "Archive";
    itemId: (string | undefined)[]
    resetCheckbox: () => void;
}

const DialogDashInventory = ({ action, itemId, resetCheckbox }: DialogDashInventoryProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();
    const { mutate } = useSWRConfig();

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/delete-inventory-bulk", {
                method: "DELETE",
                body: JSON.stringify({ ids: itemId }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                await mutate("/api/inventory");
                toast({
                    variant: "success",
                    title: "Success",
                    description: "Car(s) deleted successfully.",
                });
                setIsOpen(false);
                resetCheckbox();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "An error occurred. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleArchive = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/archive-inventory-bulk", {
                method: "PUT",
                body: JSON.stringify({ ids: itemId }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                await mutate("/api/inventory");
                toast({
                    variant: "archived",
                    title: "Success",
                    description: "Car(s) archived successfully.",
                });
                setIsOpen(false);
                resetCheckbox();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "An error occurred. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {action === "Delete" ? (
                <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                        Delete
                    </Button>
                </DialogTrigger>
            ) : (
                <DialogTrigger asChild>
                    <Button variant="archive" size="sm">
                        Archive
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure you want to {action}? </DialogTitle>
                    <DialogDescription>
                        {action === "Delete" ? "This action cannot be undone. This will permanently delete the car from the inventory." : "This will archive the car from the inventory."}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    {action === "Delete" ? (
                        <Button type="button" variant="destructive" onClick={handleDelete} disabled={isLoading}>
                            {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
                            Delete
                        </Button>
                    ) : (
                        <Button type="button" variant="archive" disabled={isLoading} onClick={handleArchive}>
                            {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
                            Archive
                        </Button>
                    )}
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default DialogDashInventory