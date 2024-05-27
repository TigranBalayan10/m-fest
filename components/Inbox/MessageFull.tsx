import { Button } from "@/components/ui/button"
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
import { Separator } from "../ui/separator";

interface MessageFullProps {
    nameFull: string;
    date: string;
    phone: string;
    message: string;
}

const MessageFull: React.FC<MessageFullProps> = ({ nameFull, date, message, phone }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="text-blue-500 p-0">
                    View Full
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{nameFull}</DialogTitle>
                    <DialogDescription>
                        {date}
                        <Separator className="mt-2 mb-2" />
                        <a href={`tel:${phone}`}>Tel: {phone}</a>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2 text-sm">
                    {message}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="default">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default MessageFull;