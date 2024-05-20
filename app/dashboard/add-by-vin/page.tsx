"use client"
import useSWR from "swr"
import { externalFetcher } from "@/lib/ExternalFetcher"
import InputForm from "@/components/DashboardForm/inputForm"
import { CarListData } from "@/lib/zodSchema"
import { VinNumber, VinSchema } from "@/lib/zodSchema"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaSpinner } from "react-icons/fa6"
import InputField from "@/components/CustomUi/InputField"

const AddByVin = () => {


    const form = useForm<VinNumber>({
        resolver: zodResolver(VinSchema),
        defaultValues: { vin: "" },
    });

    const { reset, watch } = form;
    const vin = watch("vin");
    const url = `https://car-api2.p.rapidapi.com/api/vin/${vin}`;

    const { data, error, isLoading } = useSWR(vin ? url : null, externalFetcher);
    console.log(data)

    return (
        <div className="container mx-auto px-4 sm:px-0 p-4 flex flex-col gap-4 items-center justify-center">
            <Form {...form}>
                <InputField control={form.control} name="vin" placeholder="VIN" />
            </Form>

            {isLoading ? (
                <div className="text-sm flex gap-2">
                    <FaSpinner className="animate-spin" /> Loading...
                </div>
            ) : error ? (
                <div className="text-red-500 text-xs">Failed to load. Please check the VIN and try again.</div>
            ) : data ? (
                <>
                    {(() => {
                        const { make, year, specs, trims, trim: model } = data;
                        const { body_class: description, transmission_speeds, transmission_style, drive_type: drivetrain } = specs;
                        const firstTrim = trims[0];
                        const { description: engine } = firstTrim;




                        const initialData: CarListData = {
                            model,
                            make,
                            description,
                            price: "",
                            milage: "",
                            vin,
                            drivetrain,
                            transmission: `${transmission_speeds} ${transmission_style}`,
                            engine,
                            year: year.toString(),
                            exteriorInterior: "",
                            imageUrls: [],
                        };

                        return <InputForm mode="add" initialData={initialData} />;
                    })()}
                </>
            ) : (
                <p className="text-xs m-0">Enter a VIN to fetch data</p>
            )}
        </div>
    );

}

export default AddByVin