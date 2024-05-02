"use client"
import { CarListSchema } from '@/lib/zodSchema';
import { useForm } from 'react-hook-form';
import CustomFormField from './CustomFormField';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import {
    Form
} from "@/components/ui/form"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

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
            exteriorInterior: "",
            imageUrls: []
        },
    })

    async function onSubmit(values: z.infer<typeof CarFormSchema>) {
        console.log(values, "values")
        try {
            const response = await fetch('/api/add-car', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ values })
            })
            console.log(response, "response")
            if (response.ok) {
                alert('Car added successfully');
                location.reload();
            } else {
                alert('Car could not be added')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Card className='bg-slate-300 p-4 flex flex-col items-center w-full sm:w-1/2'>
            <CardHeader className='mb-3 items-center'>
                <CardTitle>
                    Add Car
                </CardTitle>
                <CardDescription>
                    Add a new car to the inventory
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-2">
                    <CustomFormField control={form.control} name="title" placeholder="Title" />
                    <CustomFormField control={form.control} name="make" placeholder="Make" />
                    <CustomFormField control={form.control} name="description" placeholder="Description" />
                    <CustomFormField control={form.control} name="price" placeholder="Price" />
                    <CustomFormField control={form.control} name="milage" placeholder="Milage" />
                    <CustomFormField control={form.control} name="vin" placeholder="VIN" />
                    <CustomFormField control={form.control} name="year" placeholder="Year" />
                    <CustomFormField control={form.control} name="exteriorInterior" placeholder="Exterior/Interior" />
                    <div className="flex flex-col gap-2">

                        <CldUploadWidget uploadPreset="n8ak9rol" onSuccess={(results) => {
                            if (results.info && typeof results.info === 'object') {
                                const publicId = results.info.public_id;
                                if (publicId) {
                                    const prevImageUrls = form.getValues('imageUrls');
                                    form.setValue('imageUrls', [...prevImageUrls, publicId]);
                                    console.log(form.getValues('imageUrls'));
                                }
                            }
                        }}>
                            {({ open }) => {
                                return (
                                    <Button type='button' variant="outline" onClick={() => open()}>
                                        Upload Images
                                    </Button>
                                );
                            }}
                        </CldUploadWidget>
                        <div className="flex flex-wrap gap-2">
                            {form.watch('imageUrls').map((imageUrl: string, index: number) => {
                                console.log(imageUrl);
                                return (
                                    <CldImage key={index} src={imageUrl} width="100" height="100" crop="fill" alt='' />
                                );
                            })}
                        </div>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </Card>
    )

}


export default InputForm;
