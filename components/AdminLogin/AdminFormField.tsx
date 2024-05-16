import React from "react";
import { Control } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { LoginSchema } from "@/lib/zodSchema";

type FormData = z.infer<typeof LoginSchema>;

interface FormFieldProps {
    control: Control<FormData>;
    name: keyof FormData;
    placeholder: string;
}

const AdminFormField: React.FC<FormFieldProps> = ({
    control,
    name,
    placeholder,
}) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => {
            return (
                <FormItem>
                    <FormControl>
                        {name === "password" ? (
                            <Input {...field} placeholder={placeholder} type="password" />
                        ) : (
                            <Input {...field} placeholder={placeholder} type="text" />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            );
        }}
    />
);


export default AdminFormField