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

interface DialogDashProps {
    action: "Delete" | "Archive";
    itemIds: string[];
    resetSelection: () => void;
    apiEndpoint: string;
    mutateEndpoint: string;
    successMessage: string;
}

const DialogDash = ({
    action,
    itemIds,
    resetSelection,
    apiEndpoint,
    mutateEndpoint,
    successMessage,
}: DialogDashProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();
    const { mutate } = useSWRConfig();
    const count = itemIds.length;

    const handleAction = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(apiEndpoint, {
                method: action === "Delete" ? "DELETE" : "PUT",
                body: JSON.stringify({ ids: itemIds }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                await mutate(mutateEndpoint);
                toast({
                    variant: action === "Delete" ? "success" : "archived",
                    title: "Success",
                    description: `${count} ${successMessage}`,
                });
                setIsOpen(false);
                resetSelection();
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
            <DialogTrigger asChild>
                <Button variant={action === "Delete" ? "destructive" : "archive"} size="sm" disabled={itemIds.length === 0}>
                    {action}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{`Are you sure you want to ${action} ${count} item(s)?`}</DialogTitle>
                    <DialogDescription>
                        {action === "Delete"
                            ? `This action cannot be undone. This will permanently delete the selected items.`
                            : "This will archive the selected items."}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose className="sm:mt-0 mt-2" asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        variant={action === "Delete" ? "destructive" : "archive"}
                        onClick={handleAction}
                        disabled={isLoading}
                    >
                        {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
                        {action}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogDash