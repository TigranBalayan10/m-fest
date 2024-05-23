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


const AddByVin = () => {
    const [initialCarData, setInitialCarData] = useState<Car | null>(null);
    const [showVinForm, setShowVinForm] = useState<boolean>(true);
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
                if (errorData.error) {
                    throw new Error(errorData.error);
                } else {
                    throw new Error("An unexpected error occurred");
                }
            }
        } catch (error: any) {
            console.error("Error fetching data: ", error);
            // Display the error to the user or handle it in a specific way
            // For example, you can set an error state and display it in the UI
            setErrorMessage(error.message);
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