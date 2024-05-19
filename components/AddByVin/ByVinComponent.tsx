"use client"
import useSWR from "swr"
import { externalFetcher } from "@/lib/ExternalFetcher"
import InputForm from "@/components/DashboardForm/inputForm"
import { CarListData } from "@/lib/zodSchema"
import { VinNumber, VinSchema } from "@/lib/zodSchema"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

interface ByVinComponentProps {
    vin: string
}


const ByVinComponent = () => {
    const form = useForm<VinNumber>({
        resolver: zodResolver(VinSchema),
        defaultValues: {
            vin: ""
        }
    })
    const { reset, watch } = form
    const vinValue = watch("vin")
    const url = vinValue ? `https://car-api2.p.rapidapi.com/api/vin/${vinValue}` : null;
    const { data, error } = useSWR(url, externalFetcher);
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    const { make, model: title, year, specs } = data
    const { body_class: description } = specs
    const initialData: CarListData = {
        title,
        make,
        description,
        price: "",
        milage: "",
        vin: vinValue,
        year,
        exteriorInterior: "",
        imageUrls: []
    }

    return (
        <div className="container mx-auto px-4 sm:px-0 p-4 flex flex-col gap-4 items-center justify-center">
            <Form {...form}>

            </Form>
        </div>
    )
}

export default ByVinComponent