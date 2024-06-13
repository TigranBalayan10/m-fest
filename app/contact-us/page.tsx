"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ContactUsSchema } from "@/lib/zodSchema";
import InputFormContact from "@/components/ContactUs/InputFormContact";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertConfirm from "@/components/CustomUi/AlertConfirm";
import { FaSpinner } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";



const formSchema = ContactUsSchema;

export default function ContactUs() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("Success");

  const searchParams = useSearchParams();
  const carInfo = searchParams.get("car_info");
  const [vin, make, model] = carInfo ? carInfo.split("-") : ["", "", ""];
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      content: carInfo ? `I am interested in the ${make} ${model} with VIN: ${vin}` : "",
    },
  });

  const { errors, isValid, isDirty, isSubmitting } = form.formState;
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    try {
      const response = await fetch("/api/add-contact-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      });
      if (response.ok) {
        setAlertMessage("Your message has been sent successfully!");
        setShowAlert(true);
        setAlertTitle("Success");
      } else {
        setAlertMessage("An error occurred, please try again later");
        setShowAlert(true);
        setAlertTitle("Error");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center mt-8">
      <Card className="max-w-md shadow-md mx-4 card-bg border-none text-white">
        <CardHeader>
          <CardTitle className="text-center">Get in Touch</CardTitle>
          <CardDescription className="text-center text-gray-400 dark:text-gray-400">
            We'd love to hear from you! Fill out the form below to send us a
            message.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <InputFormContact
                control={form.control}
                name="name"
                placeholder="Name"
              />
              <InputFormContact
                control={form.control}
                name="email"
                placeholder="Email"
              />
              <InputFormContact
                control={form.control}
                name="phone"
                placeholder="Phone"
              />
              <InputFormContact
                control={form.control}
                name="content"
                placeholder="Message"
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="gap-2">
          <Button onClick={form.handleSubmit(onSubmit)}>
            {" "}
            {isSubmitting && "Submitting..."}
            {isSubmitting && <FaSpinner className="animate-spin ml-2" />}
            {!isSubmitting && "Submit"}
          </Button>
          <Button variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
      {showAlert &&
        (alertTitle ? (
          <AlertConfirm
            title={alertTitle}
            description={alertMessage}
            rerouteHref="/"
          />
        ) : (
          <AlertConfirm
            title={alertTitle}
            description={alertMessage}
            rerouteHref="/"
          />
        ))}
    </div>
  );
}
