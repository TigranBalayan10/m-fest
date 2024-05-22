"use client";
import InputForm from "@/components/DashboardForm/inputForm"
import { CarListData } from "@/lib/zodSchema"
import { VinNumber, VinSchema } from "@/lib/zodSchema"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaSpinner } from "react-icons/fa6"
import InputField from "@/components/CustomUi/InputField"
import useVinData from "@/lib/fetchVinDecodeData"
import { Button } from "@/components/ui/button";



const AddByVin = () => {

    const form = useForm<VinNumber>({
        resolver: zodResolver(VinSchema),
        defaultValues: {
            vin: ""
        }
    })

    function onSubmit(value: VinNumber) {
        console.log(value)
    }

    // const vin = "WBSAE0C0XLCD77497"
    // const { decodeData, engineData, milageData, error } = useVinData(vin);



    // if (error) {
    //     // Handle the error
    //     return <div>Error: {error.message}</div>;
    // }

    // if (!decodeData || !engineData || !milageData) {
    //     // Handle loading state
    //     return <div>Loading...</div>;
    // }
    // const engineInfo = engineData.data[0];
    return (
        <div className="flex justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-3">
                    <div className="flex space-x-3 items-start">
                        <div className="w-full">
                            <InputField
                                control={form.control}
                                name="vin"
                                placeholder="VIN"
                                label="VIN Number"
                            />
                        </div>
                        <Button type="submit" className="mt-8">
                            {form.formState.isSubmitting ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                "Search"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default AddByVin