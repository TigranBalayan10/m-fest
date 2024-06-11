"use client";
import { CarListSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import CustomFormField from "./CustomFormField";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import AlertConfirm from "@/components/CustomUi/AlertConfirm";
import { useState } from "react";
import { FaSpinner, FaUpload } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { revalidateAll } from "@/lib/actions";
import IsHotCheckbox from "../CustomUi/IsHotCheckbox";

const CarFormSchema = CarListSchema;

const InputForm = ({
  mode = "add",
  initialData,
}: {
  mode?: "add" | "edit" | "addByVin";
  initialData?: {
    id?: string;
    make: string;
    model: string;
    description?: string;
    price: number;
    milage: number;
    vin: string;
    drivetrain: string;
    transmission: string;
    engine: string;
    mpg: string;
    year: number;
    exteriorInterior: string;
    imageUrls: string[];
    isHot?: boolean;
    isSold?: boolean;
  };
}) => {
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("Success");

  const defaultValues = mode === "edit" || mode === "addByVin" ? {
    ...initialData,
    price: initialData?.price?.toString() || "",
    milage: initialData?.milage?.toString() || "",
    year: initialData?.year?.toString() || "",
    isHot: initialData?.isHot || false,
    isSold: initialData?.isSold || false,
  }
    : {
      model: "",
      make: "",
      description: "",
      price: "",
      milage: "",
      year: "",
      vin: "",
      drivetrain: "",
      transmission: "",
      engine: "",
      mpg: "",
      exteriorInterior: "",
      imageUrls: [],
      isHot: false,
    };

  const form = useForm<z.infer<typeof CarFormSchema>>({
    resolver: zodResolver(CarFormSchema),
    defaultValues: defaultValues
  });

  const { reset } = form;

  const { isDirty, isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof CarFormSchema>) {
    const carFormData = {
      ...values,
      price: Number(values.price),
      milage: Number(values.milage),
      year: Number(values.year),
      isHot: values.isHot,
      isSold: values.isSold,
    };
    try {
      // Determine the API endpoint and the HTTP method based on the mode
      const url =
        mode === "edit"
          ? `/api/update-inventory/${initialData?.id}`
          : "/api/add-car";
      const method = mode === "edit" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: carFormData }),
      });

      const data = await response.json();
      if (response.ok) {
        setAlertMessage(data.message);
        setShowAlert(true);
        setAlertTitle("Success");
        revalidateAll();
      } else {
        setAlertMessage(data.message);
        setShowAlert(true);
        setAlertTitle("Error");
        revalidateAll();
      }
    } catch (error) {
      setShowAlert(true);
      setAlertTitle("Error");
      setAlertMessage("An error occurred. Please try again");
    }
  }

  async function handleRemoveImage(imageUrl: string) {
    // console.log(imageUrl, "imageUrl")
    try {
      const response = await fetch("/api/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });
      console.log(response, "response");
      if (response.ok) {
        // Remove the image URL from the form
        const imageUrls = form.getValues("imageUrls");
        const newImageUrls = imageUrls.filter((url) => url !== imageUrl);
        form.setValue("imageUrls", newImageUrls, { shouldDirty: true });
      } else {
        console.error("Failed to delete image from carData object");
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
            {mode === "add" ? "Add Inventory" : mode === "addByVin" ? "Add Inventory by VIN" : "Edit Inventory"}
          </CardTitle>
          <CardDescription>
            {mode === "add"
              ? "Fill out the form below to add inventory"
              : mode === "addByVin"
                ? "Fill out the form below to add inventory by VIN"
                : "Edit the form below to edit inventory"}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <CustomFormField
                    control={form.control}
                    name="make"
                    placeholder="Make"
                  />
                </div>
                <div className="grid gap-2">
                  <CustomFormField
                    control={form.control}
                    name="model"
                    placeholder="Model"
                  />
                </div>
                <div className="grid gap-2">
                  {mode === "edit" && (
                    <CustomFormField
                      control={form.control}
                      name="vin"
                      placeholder="VIN"
                      disabled
                    />
                  )}
                  {mode === "add" && (
                    <CustomFormField
                      control={form.control}
                      name="vin"
                      placeholder="VIN"
                    />
                  )}
                  {mode === "addByVin" && (
                    <CustomFormField
                      control={form.control}
                      name="vin"
                      placeholder="VIN"
                      disabled
                    />
                  )}
                </div>
                <div className="grid gap-2">
                  <CustomFormField
                    control={form.control}
                    name="description"
                    placeholder="Description"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <CustomFormField
                      control={form.control}
                      name="price"
                      placeholder="Price"
                    />
                  </div>
                  <div className="grid gap-2">
                    <CustomFormField
                      control={form.control}
                      name="milage"
                      placeholder="Milage"
                    />
                  </div>
                  <div className="grid gap-2">
                    <CustomFormField
                      control={form.control}
                      name="exteriorInterior"
                      placeholder="Exterior/Interior"
                    />
                  </div>
                  <div className="grid gap-2">
                    <CustomFormField
                      control={form.control}
                      name="year"
                      placeholder="Year"
                    />
                  </div>
                  <div className="grid gap-2">
                    <CustomFormField
                      control={form.control}
                      name="drivetrain"
                      placeholder="Drivetrain"
                    />
                  </div>
                  <div className="grid gap-2">
                    <CustomFormField
                      control={form.control}
                      name="transmission"
                      placeholder="Transmission"
                    />
                  </div>
                  <div className="grid gap-2">
                    <CustomFormField
                      control={form.control}
                      name="engine"
                      placeholder="Engine"
                    />
                  </div>
                  <div className="grid gap-2">
                    <CustomFormField
                      control={form.control}
                      name="mpg"
                      placeholder="MPG"
                    />
                  </div>
                  <div className="grid gap-2">
                    <IsHotCheckbox control={form.control} name="isHot" label="Mark as Hot" />
                  </div>
                  <div className="grid gap-2">
                    <IsHotCheckbox control={form.control} name="isSold" label="Mark as Sold" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 block ">
                    <CldUploadWidget
                      uploadPreset="n8ak9rol"
                      options={{
                        sources: ["local", "url", "unsplash"],
                        multiple: true,
                        maxFiles: 8,
                      }}
                      onSuccess={(results) => {
                        if (results.info && typeof results.info === "object") {
                          const publicId = results.info.public_id;
                          if (publicId) {
                            const prevImageUrls = form.getValues("imageUrls");
                            form.setValue(
                              "imageUrls",
                              [...prevImageUrls, publicId],
                              { shouldDirty: true },
                            );
                            console.log(form.getValues("imageUrls"));
                          }
                        }
                      }}
                    >
                      {({ open }) => {
                        return (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => open()}
                          >
                            <FaUpload className="mr-2" />
                            Upload Images
                          </Button>
                        );
                      }}
                    </CldUploadWidget>
                    <div className="flex flex-wrap gap-2">
                      {form
                        .watch("imageUrls")
                        .map((imageUrl: string, index: number) => {
                          return (
                            <div key={index} className="relative mt-2 ">
                              <CldImage
                                key={index}
                                src={imageUrl}
                                width="100"
                                height="100"
                                crop="fill"
                                alt=""
                                className="rounded shadow-zinc-800"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="badge"
                                className="absolute top-0 right-0"
                                onClick={() => {
                                  console.log(imageUrl, "imageUrl");
                                  handleRemoveImage(imageUrl);
                                }}
                              >
                                <IoCloseOutline />
                              </Button>
                            </div>
                          );
                        })}
                    </div>
                    {form.formState.errors.imageUrls && (
                      <p className="text-destructive text-xs font-medium mt-1">
                        {form.formState.errors.imageUrls.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <CardFooter className="flex justify-end gap-3 px-0 my-4">
                {(mode === "add" || mode === "addByVin") && (
                  <Button disabled={!isDirty} type="submit">
                    {isSubmitting ? "Adding..." : "Add Inventory"}
                    {isSubmitting && <FaSpinner className="animate-spin ml-2" />}
                  </Button>
                )}
                {(mode === "add" || mode === "addByVin") && (
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => reset()}
                  >
                    Reset
                  </Button>
                )}
                {(mode === "add" || mode === "addByVin") && (
                  <Button
                    type="button"
                    onClick={() => router.push("/dashboard")}
                  >
                    Cancel
                  </Button>
                )}
                {mode === "edit" && (
                  <Button disabled={!isDirty} type="submit">
                    {isSubmitting ? "Saving..." : "Save Changes"}
                    {isSubmitting && (
                      <FaSpinner className="animate-spin ml-2" />
                    )}
                  </Button>
                )}
                {mode === "edit" && (
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => reset()}
                  >
                    Reset
                  </Button>
                )}
                {mode === "edit" && (
                  <Button
                    type="button"
                    onClick={() => router.push("/dashboard")}
                  >
                    Cancel
                  </Button>
                )}
              </CardFooter>
            </form>
          </CardContent>
        </Form>
      </Card>
      {showAlert &&
        (alertTitle ? (
          <AlertConfirm
            title={alertTitle}
            description={alertMessage}
            rerouteHref="/dashboard"
          />
        ) : (
          <AlertConfirm
            title={alertTitle}
            description={alertMessage}
            rerouteHref="/dashboard"
          />
        ))}
    </>
  );
};

export default InputForm;
