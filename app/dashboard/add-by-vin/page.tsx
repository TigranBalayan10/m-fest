"use client";
import InputForm from "@/components/DashboardForm/inputForm"
import { Car } from "@/lib/types";
import { VinNumber, VinSchema } from "@/lib/zodSchema"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaSpinner } from "react-icons/fa6"
import InputField from "@/components/CustomUi/InputField"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AlertError from "@/components/CustomUi/AlertError";


const AddByVin = () => {
    const [initialCarData, setInitialCarData] = useState<Car | null>(null);
    const [showVinForm, setShowVinForm] = useState<boolean>(true);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm<VinNumber>({
        resolver: zodResolver(VinSchema),
        defaultValues: { vin: "" },
    });


    async function onSubmit(value: VinNumber) {
        try {
            const vin = value.vin;
            console.log("VIN: ", vin);

            const response = await fetch(`/api/add-car-by-vin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ vin }),
            });

            if (response.ok) {
                const initialCarData = await response.json();
                setInitialCarData(initialCarData);
                setShowVinForm(false);
            } else {
                const errorData = await response.json();
                console.log("Error fetching data: ", errorData);
                if (errorData.error) {
                    setErrorMessage(errorData.error);
                    setShowErrorMessage(true);
                } else {
                    setErrorMessage("An unexpected error occurred");
                    setShowErrorMessage(true);
                }
            }
        } catch (error: any) {
            console.error("Error fetching data: ", error);
            setErrorMessage(error.message);
            setShowErrorMessage(true);
        }
    }

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
                                    <>
                                        <FaSpinner className="animate-spin inline-block mr-2" />
                                        Searching...
                                    </>
                                ) : (
                                    "Search"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
            {initialCarData ? (
                <InputForm mode="addByVin" initialData={initialCarData} />
            ) : errorMessage && showErrorMessage ? (
                <AlertError
                    title={`${errorMessage}`}
                    description="Cannot find the car with the provided VIN number. Please try again or add the car manually."
                />
            ) : null}
        </div>
    );
}

export default AddByVin