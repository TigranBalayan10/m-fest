import React from "react";
import { Control, useController, useFormContext, useWatch } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { custom, z } from "zod";
import { FinancingFormSchema } from "@/lib/zodSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateMonthOptions, generateDayOptions, generateYearOptions } from "@/lib/dateUtils";
import { FaSpinner } from "react-icons/fa6";

type FormData = z.infer<typeof FinancingFormSchema>;

interface FormFieldProps {
    control: Control<FormData>;
    name: keyof FormData["financing"]["personal"] | keyof FormData["financing"]["contact"] | keyof FormData["financing"]["car"];
    placeholder: string;
    label: string;
    customErrorMessage?: string;
    spinner?: boolean;
}

const FinancingInput: React.FC<FormFieldProps> = ({
    control,
    name,
    placeholder,
    label,
    customErrorMessage,
    spinner,
}) => {
    const isPersonalField = name in FinancingFormSchema.shape.financing.shape.personal.shape;
    const isCarField = name in FinancingFormSchema.shape.financing.shape.car.shape;
    const fieldName = isPersonalField
        ? `financing.personal.${name}`
        : isCarField
            ? `financing.car.${name}`
            : `financing.contact.${name}`;

    const monthController = useController({
        name: "financing.personal.dob.month" as const,
        control,
    });

    const errorMonth = monthController.fieldState.error?.message;

    const dayController = useController({
        name: "financing.personal.dob.day" as const,
        control,
    });

    const errorDay = dayController.fieldState.error?.message;

    const yearController = useController({
        name: "financing.personal.dob.year" as const,
        control,
    });

    const errorYear = yearController.fieldState.error?.message;

    console.log(errorDay, errorMonth, errorYear)


    if (name === "dob") {
        return (
            <FormField
                control={control}
                name="financing.personal.dob"
                render={() => (
                    <FormItem className="text-black">
                        <FormLabel className="text-gray-300 text-xs">{label}</FormLabel>
                        <div className="flex space-x-2">
                            <div className="w-full space-x-2">
                                <Select
                                    onValueChange={monthController.field.onChange}
                                    value={monthController.field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Month" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {generateMonthOptions().map(({ value, label }) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errorMonth && (
                                    <p className="mt-1 text-red-500 text-xs">{errorMonth}</p>
                                )}
                            </div>
                            <div className="w-full space-x-1">
                                <Select
                                    onValueChange={dayController.field.onChange}
                                    value={dayController.field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Day" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {generateDayOptions().map(({ value, label }) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errorDay && (
                                    <p className="mt-1 text-red-500 text-xs">{errorDay}</p>
                                )}
                            </div>
                            <div className="w-full space-x-1">
                                <Select
                                    onValueChange={yearController.field.onChange}
                                    value={yearController.field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Year" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {generateYearOptions().map(({ value, label }) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errorYear && (
                                    <p className="mt-1 text-red-500 text-xs">{errorYear}</p>
                                )}
                            </div>
                        </div>
                    </FormItem>
                )}
            />
        );
    }

    if (name === "vin") {
        return (
            <FormField
                control={control}
                name="financing.car.vin"
                render={({ field }) => {
                    return (
                        <FormItem className="text-black">
                            <FormLabel className="text-gray-300 text-xs">{label}</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input {...field} placeholder={placeholder} />
                                    {spinner && (
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                            <FaSpinner className="animate-spin" />
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            {customErrorMessage ? <FormMessage>{customErrorMessage}</FormMessage> : <FormMessage />}
                        </FormItem>
                    );
                }}
            />
        );
    }

    return (
        <FormField
            control={control}
            name={fieldName as any}
            render={({ field }) => {
                return (
                    <FormItem className="text-black">
                        <FormLabel className="text-gray-300 text-xs">{label}</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={placeholder} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

export default FinancingInput;