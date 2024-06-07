import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

interface ToastAlertProps {
    title: string;
    description: string;
    variant: "default" | "destructive" | null | undefined;
}

const ToastAlert: React.FC<ToastAlertProps> = ({ title, description, variant }) => {
    const { toast } = useToast();

    toast({
        variant: variant,
        title: title,
        description: description,
        duration: 5000,
        action: (
            <ToastAction altText={`Close toaster`}>
                OK
            </ToastAction>
        ),
    });

    return null;
};

export default ToastAlert;