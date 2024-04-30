import { CarListSchema } from '@/lib/zodSchema';
import { useForm } from 'react-hook-form';
import CustomFormField from './CustomFormField';
import {
    Form
} from "@/components/ui/form"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '../ui/button';


const CarFormSchema = CarListSchema;


const InputForm = () => {

    const form = useForm<z.infer<typeof CarFormSchema>>({
        resolver: zodResolver(CarFormSchema),
        defaultValues: {
            title: "",
            make: "",
            description: "",
            price: "",
            milage: "",
            vin: "",
            year: "",
            exteriorInterior: ""
        },
    })

    async function onSubmit(values: z.infer<typeof CarFormSchema>) {
        try {
            const response = await fetch('/api/add-car', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='container bg-teal-300 p-4 flex flex-col'>
            <h1>Car Form</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <CustomFormField control={form.control} name="title" placeholder="Title" />
                    <CustomFormField control={form.control} name="make" placeholder="Make" />
                    <CustomFormField control={form.control} name="description" placeholder="Description" />
                    <CustomFormField control={form.control} name="price" placeholder="Price" />
                    <CustomFormField control={form.control} name="milage" placeholder="Milage" />
                    <CustomFormField control={form.control} name="vin" placeholder="VIN" />
                    <CustomFormField control={form.control} name="year" placeholder="Year" />
                    <CustomFormField control={form.control} name="exteriorInterior" placeholder="Exterior/Interior" />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )

}


export default InputForm;
