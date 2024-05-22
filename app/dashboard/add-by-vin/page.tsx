"use client";
import InputForm from "@/components/DashboardForm/inputForm"
import { Car } from "@/lib/types";
import { VinNumber, VinSchema } from "@/lib/zodSchema"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaSpinner } from "react-icons/fa6"
import InputField from "@/components/CustomUi/InputField"
import useVinData from "@/lib/fetchVinDecodeData"
import { Button } from "@/components/ui/button";
import { useState } from "react";


const AddByVin = () => {
    const [initialCarData, setInitialCarData] = useState<Car | null>(null);
    const [showVinForm, setShowVinForm] = useState<boolean>(true);

    const form = useForm<VinNumber>({
        resolver: zodResolver(VinSchema),
        defaultValues: { vin: "" },
    });

    const { decodeData, engineData, milageData, error } = useVinData(form.watch("vin"));

    
    async function onSubmit(value: VinNumber) {



        const model = decodeData?.make
        const make = `${decodeData?.model} ${decodeData?.trims[0]?.name}`
        const year = decodeData?.year
        const engine = `${engineData?.size}L ${engineData?.cylinders} ${engineData?.engine_type}, ${engineData?.horsepower_hp}hp ${engineData?.torque_ft_lbs}ft-lbs`
        const drivetrain = engineData?.drive_type
        const transmission = engineData?.transmission

        const initialCarData: Car = {
            vin: value.vin,
            model: make || "",
            make: model || "",
            description: "",
            price: 0,
            milage: 0,
            year: year || 0,
            engine: engine,
            drivetrain: drivetrain || "",
            transmission: transmission || "",
            exteriorInterior: "",
            imageUrls: [],
        }

        setInitialCarData(initialCarData)
        setShowVinForm(false);
    }

    console.log(milageData)

    // const vin = "WBSAE0C0XLCD77497"




    // const engineInfo = engineData.data[0];
    return (
        <div className="container mx-auto px-4 sm:px-0 p-4 flex flex-col gap-4 items-center justify-center">
            {showVinForm && (
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
            )}
            {initialCarData && (
                <InputForm mode="addByVin" initialData={initialCarData} />
            )}
        </div>
    );
}

export default AddByVin