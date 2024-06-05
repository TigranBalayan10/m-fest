"use client";

import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
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


const FinancingForm = () => {
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
            createdAt: undefined,
            updatedAt: undefined,
        },
    };

    const form = useForm<FinancingFormType>({
        resolver: zodResolver(FinancingFormSchema),
        defaultValues,
    })

    const { errors, isValid, isDirty, isSubmitting } = form.formState
    console.log("Errors", errors)


    function onSubmit(data: FinancingFormType) {
        console.log("Submitted Data", data)
    }

    return (
        <>
            <Card className="shadow-md m-4 card-bg border-none text-white w-[780px] p-3">
                <CardHeader>
                    <CardTitle className="text-center">Financing Form</CardTitle>
                    <CardDescription className="text-center text-gray-400 dark:text-gray-400">
                        Fill out the form below to apply for financing.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CardContent>
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
                                <FinancingInput control={form.control} name="dob" placeholder="Date of Birth" label="Date of Birth" />
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
                            <Button type="submit" size="lg">Submit</Button>
                            <Button variant="destructive" type="reset" size="lg" onClick={() => form.reset()}>Reset</Button>
                            <Button variant="secondary" size="lg">Cancel</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card >
        </>
    )
}

export default FinancingForm