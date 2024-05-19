import React from "react";
import { Control, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: keyof T;
  placeholder: string;
}

const InputField = <T extends Record<string, any>>({
  control,
  name,
  placeholder,
}: FormFieldProps<T>) => (
  <FormField
    control={control}
    name={name as any}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input {...field} placeholder={placeholder} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default InputField;