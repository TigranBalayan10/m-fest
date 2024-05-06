import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings } from "lucide-react"
import InputForm from "@/components/DashboardForm/inputForm"
import {CarListSchema} from "@/lib/zodSchema"
import { z } from "zod"




const EditDialog = ({ car }: { car: z.infer<typeof CarListSchema> }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Settings color="black" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Car Info</DialogTitle>
                    <DialogDescription>
                        Make changes to car info. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <InputForm mode="edit" initialData={car} />
            </DialogContent>
        </Dialog>
    )
}

export default EditDialog