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
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import AlertConfirm from '@/components/CustomUi/AlertConfirm';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa6';



const CarFormSchema = CarListSchema;


const InputForm = ({ mode = 'add', initialData }: { mode?: 'add' | 'edit', initialData?: z.infer<typeof CarFormSchema> }) => {
    const router = useRouter();

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('Success');

    const form = useForm<z.infer<typeof CarFormSchema>>({
        resolver: zodResolver(CarFormSchema),
        defaultValues: initialData || {
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

    const { reset } = form;

    const { errors, isValid, isDirty, isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof CarFormSchema>) {

        try {
            // Determine the API endpoint and the HTTP method based on the mode
            const url = mode === 'add' ? '/api/add-car' : `/api/update-inventory/${initialData?.id}`;
            const method = mode === 'add' ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ values })
            })
            if (response.ok) {
                setAlertMessage(`Car ${mode === 'add' ? 'added' : 'updated'} successfully`);
                setShowAlert(true);
                setAlertTitle('Success');
            } else {
                setAlertMessage(`Car could not be ${mode === 'add' ? 'added' : 'updated'}`);
                setShowAlert(true);
                setAlertTitle('Error');
            }
        } catch (error) {
            console.error(error)
        }
    }


    async function handleRemoveImage(imageUrl: string) {
        // console.log(imageUrl, "imageUrl")
        try {
            const response = await fetch('/api/delete-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl }),
            });
            console.log(response, "response")
            if (response.ok) {
                // Remove the image URL from the form
                const imageUrls = form.getValues('imageUrls');
                const newImageUrls = imageUrls.filter(url => url !== imageUrl);
                form.setValue('imageUrls', newImageUrls);
            } else {
                console.error('Failed to delete image from carData object');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {mode === 'add' ? 'Add Inventory' : 'Edit Inventory'}
                    </CardTitle>
                    <CardDescription>
                        {mode === 'add' ? 'Fill out the form below to add inventory' : 'Edit the form below to edit inventory'}
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <CustomFormField control={form.control} name="title" placeholder="Title" />
                                </div>
                                <div className="grid gap-2">
                                    <CustomFormField control={form.control} name="make" placeholder="Make" />
                                </div>

                                <div className="grid gap-2">
                                    <CustomFormField control={form.control} name="description" placeholder="Description" />
                                </div>
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
                                            return (
                                                <div key={index} className="relative">
                                                    <CldImage key={index} src={imageUrl} width="100" height="100" crop="fill" alt='' />
                                                    <Button
                                                        type='button'
                                                        variant="destructive"
                                                        size="badge"
                                                        className="absolute top-0 right-0"
                                                        
                                                        
                                                        onClick={() => {
                                                            console.log(imageUrl, "imageUrl")
                                                            handleRemoveImage(imageUrl)
                                                        }}
                                                    >
                                                        X
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {mode === 'add' && (
                                        <Button disabled={!isDirty} type="submit">
                                            {isSubmitting ? 'Adding...' : 'Add Inventory'}
                                            {isSubmitting && <FaSpinner className="animate-spin ml-2" />}
                                        </Button>
                                    )}
                                    {mode === 'add' && <Button type="button" onClick={() => reset()}>Reset</Button>}
                                    {mode === 'add' && <Button type="button" onClick={() => router.push("/dashboard")}>Cancel</Button>}
                                    {mode === 'edit' && (
                                        <Button disabled={!isDirty} type="submit">
                                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                                            {isSubmitting && <FaSpinner className="animate-spin ml-2" />}
                                        </Button>
                                    )}
                                    {mode === 'edit' && <Button type="button" onClick={() => reset()}>Reset</Button>}
                                    {mode === 'edit' && <Button type="button" onClick={() => router.push("/dashboard")}>Cancel</Button>}
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Form>
            </Card>
            {showAlert && (alertTitle ? <AlertConfirm title={alertTitle} description={alertMessage} /> : <AlertConfirm title={alertTitle} description={alertMessage} />)}
        </>
    )

}


export default InputForm;
