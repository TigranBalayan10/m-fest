"use client";

import { useForm } from "react-hook-form"
import { useState } from "react";
import { Form, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import FinancingInput from "./FinancingInput";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FinancingFormSchema, FinancingFormType } from "@/lib/zodSchema";
import { FaSpinner } from "react-icons/fa6";
import AlertConfirm from "../CustomUi/AlertConfirm";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/swrFetcher";


const FinancingForm = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("Success");


    const defaultValues: Partial<FinancingFormType> = {
        financing: {
            personal: {
                firstName: '',
                middleName: '',
                lastName: '',
                ssnItin: '',
                dob: {
                    month: '',
                    day: '',
                    year: '',
                }
            },
            contact: {
                phone: '',
                email: '',
                address: '',
                city: '',
                state: '',
                zip: '',
            },
            car: {
                vin: '',
            },
        },
    };

    const form = useForm<FinancingFormType>({
        resolver: zodResolver(FinancingFormSchema),
        defaultValues,
        mode: 'onChange',
    })
    const vin = form.watch('financing.car.vin');

    const { data, error, isLoading } = useSWR(vin ? `/api/get-inventory/${vin}` : null, fetcher);
    const carInfo = data?.data;



    const { errors, isValid, isDirty, isSubmitting, isSubmitSuccessful } = form.formState


    async function onSubmit(data: FinancingFormType) {
        try {
            const res = await fetch('/api/add-financing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            })
            if (res.ok) {
                setAlertMessage("Financing application submitted successfully. We will contact you shortly.")
                setShowAlert(true)
                setAlertTitle("Success")
                form.reset()
            } else {
                const data = await res.json()
                const errorMessage = data?.error?.message || "An error occurred while submitting the financing application"

                setShowAlert(true)
                setAlertMessage(`${errorMessage}`)
                setAlertTitle("Error")
            }
        } catch (error) {
            console.error("Error", error)
        }
    }

    return (
        <>
            <Card className="shadow-md m-4 card-bg border-none text-white w-[600px] p-3">
                <CardHeader>
                    <CardTitle className="text-center">Financing Form</CardTitle>
                    <CardDescription className="text-center text-gray-400 dark:text-gray-400">
                        Fill out the form below to apply for financing.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CardContent>
                            <h3 className="text-lg font-semibold">Car Info for Financing </h3>
                            <CardDescription className="text-gray-400">
                                Please input vin number to get car information.
                            </CardDescription>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4">
                                <FinancingInput control={form.control} name="vin" placeholder="VIN" label="VIN number" customErrorMessage={error?.message} spinner={vin !== "" && isLoading} />
                                {carInfo && (
                                    <div>
                                        <p>Make: {carInfo.make}</p>
                                        <p>Model: {carInfo.model}</p>
                                        <p>Price: ${carInfo.price}</p>
                                    </div>
                                )}
                            </div>
                            <h3 className="text-lg font-semibold">Personal Info</h3>
                            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                                <FinancingInput control={form.control} name="firstName" placeholder="First Name" label="First Name" />
                                <FinancingInput control={form.control} name="middleName" placeholder="Middle Name" label="Middle Name" />
                                <FinancingInput control={form.control} name="lastName" placeholder="Last Name" label="Last Name" />
                            </div>
                            <div className="mt-4">
                                <FinancingInput control={form.control} name="ssnItin" placeholder="SSN/ITIN" label="SSN/ITIN" />
                            </div>
                            <div className="mt-4">
                                <FinancingInput control={form.control} name="dob" placeholder="Date of Birth" label="Date of Birth"/>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold">Contact Info</h3>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                <FinancingInput control={form.control} name="phone" placeholder="Phone" label="Phone" />
                                <FinancingInput control={form.control} name="email" placeholder="Email" label="Email" />
                                <FinancingInput control={form.control} name="address" placeholder="Address" label="Address" />
                                <FinancingInput control={form.control} name="city" placeholder="City" label="City" />
                                <FinancingInput control={form.control} name="state" placeholder="State" label="State" />
                                <FinancingInput control={form.control} name="zip" placeholder="ZIP Code" label="ZIP Code" />
                            </div>
                        </CardContent>
                        <CardFooter className="gap-2">
                            <Button disabled={!isDirty} type="submit" size="lg">
                                {isSubmitting ? "Submitting..." : "Submit"}
                                {isSubmitting && <FaSpinner className="animate-spin ml-2" />}
                            </Button>
                            <Button variant="destructive" type="reset" size="lg" onClick={() => form.reset()}>Reset</Button>
                            <Link href="/"><Button variant="secondary" size="lg">Cancel</Button></Link>
                        </CardFooter>
                    </form>
                </Form>
            </Card >
            {showAlert &&
                (alertTitle ? (
                    <AlertConfirm
                        title={alertTitle}
                        description={alertMessage}
                    />
                ) : (
                    <AlertConfirm
                        title={alertTitle}
                        description={alertMessage}
                        rerouteHref="/"
                    />
                ))}
        </>
    )
}

export default FinancingForm