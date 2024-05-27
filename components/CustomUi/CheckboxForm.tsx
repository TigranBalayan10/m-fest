import React from "react";
import { Control, FieldValues } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "../ui/checkbox";

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: keyof T;
    contactId: string;
}

const CheckboxForm = <T extends Record<string, any>>({
    control,
    name,
    contactId,
}: FormFieldProps<T>) => (
    <FormField
        control={control}
        key={contactId}
        name={name as any}
        render={({ field }) => (
            <FormItem key={contactId}>
                <FormControl>
                    <Checkbox
                        checked={field.value?.includes(contactId)}
                        onCheckedChange={(checked) => {
                            return checked
                                ? field.onChange([...field.value, contactId])
                                : field.onChange(
                                    field.value?.filter(
                                        (value: string) => value !== contactId
                                    )
                                )
                        }}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default CheckboxForm;