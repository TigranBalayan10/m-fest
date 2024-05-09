"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { ContactUsSchema } from "@/lib/zodSchema"
import InputFormContact from "@/components/ContactUs/InputFormContact"
import { Form } from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"

const formSchema = ContactUsSchema

export default function ContactUs() {
    const router = useRouter()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Card className="mx-auto max-w-md mt-4 shadow-md">
            <CardHeader>
                <CardTitle className="text-center">Get in Touch</CardTitle>
                <CardDescription className="text-center text-gray-500 dark:text-gray-400">
                    We'd love to hear from you! Fill out the form below to send us a message.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <InputFormContact control={form.control} name="name" placeholder="Name" />
                        <InputFormContact control={form.control} name="email" placeholder="Email" />
                        <InputFormContact control={form.control} name="phone" placeholder="Phone" />
                        <InputFormContact control={form.control} name="message" placeholder="Message" />
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="gap-2">
                <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
                <Button variant="secondary" onClick={() => router.push("/")} >Cancel</Button>
            </CardFooter>
        </Card>
    )
}
