import React from "react";
import { Control, useController } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { FinancingFormSchema } from "@/lib/zodSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateMonthOptions, generateDayOptions, generateYearOptions } from "@/lib/dateUtils";

type FormData = z.infer<typeof FinancingFormSchema>;

interface FormFieldProps {
    control: Control<FormData>;
    name: keyof FormData["financing"]["personal"] | keyof FormData["financing"]["contact"];
    placeholder: string;
    label: string;
}

const FinancingInput: React.FC<FormFieldProps> = ({
    control,
    name,
    placeholder,
    label,
}) => {
    const isPersonalField = name in FinancingFormSchema.shape.financing.shape.personal.shape;
    const fieldName = isPersonalField ? `financing.personal.${name}` : `financing.contact.${name}`;

    if (name === "dob") {
        const monthController = useController({
            name: "financing.personal.dob.month" as const,
            control,
        });

        const dayController = useController({
            name: "financing.personal.dob.day" as const,
            control,
        });

        const yearController = useController({
            name: "financing.personal.dob.year" as const,
            control,
        });

        return (
            <FormField
                control={control}
                name="financing.personal.dob"
                render={() => (
                    <FormItem className="text-black">
                        <FormLabel className="text-gray-300 text-xs">{label}</FormLabel>
                        <div className="flex space-x-2">
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
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
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