import FinancingForm from "@/components/Financing/FinancingForm"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const FinancingFormPage = () => {
    return (
        <div className="flex items-center justify-center mt-8">
            <Card className="max-w-md shadow-md mx-4 card-bg border-none text-white w-lvw">
                <CardHeader>
                    <CardTitle className="text-center">Financing Form</CardTitle>
                    <CardDescription className="text-center text-gray-400 dark:text-gray-400">
                        Fill out the form below to apply for financing.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FinancingForm />
                </CardContent>
                <CardFooter className="gap-2">
                    <Button>Submit</Button>
                    <Button variant="secondary">Cancel</Button>
                </CardFooter>
            </Card>
        </div>
      
    )
}

export default FinancingFormPage