import React from "react";
import { Control, FieldValues } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "../ui/checkbox";

interface IsHotCheckboxProps<T extends FieldValues> {
    control: Control<T>;
    name: keyof T;
    label: string;
}

const IsHotCheckbox = <T extends Record<string, any>>({
    control,
    name,
    label,
}: IsHotCheckboxProps<T>) => (
    <FormField
        control={control}
        name={name as any}
        render={({ field }) => (
            <FormItem className="flex space-x-2 space-y-0 mt-2">
                <FormControl>
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                            field.onChange(checked);
                        }}
                    />
                </FormControl>
                <FormLabel className="font-normal">{label}</FormLabel>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default IsHotCheckbox;