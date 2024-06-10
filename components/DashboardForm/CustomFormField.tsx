import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CarListData } from "@/lib/zodSchema";

type FormData = CarListData;

interface FormFieldProps {
  control: Control<FormData>;
  name: keyof FormData;
  placeholder: string;
}

const CustomFormField: React.FC<FormFieldProps> = ({
  control,
  name,
  placeholder,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => {
      const { value, ...restField } = field;
      const inputValue = typeof value === "string" || typeof value === "number" ? value : "";
      return (
        <FormItem>
          <FormControl>
            {name === "description" ? (
              <Textarea {...restField} value={inputValue as string} placeholder={placeholder} />
            ) : (
              <Input {...restField} value={inputValue} placeholder={placeholder} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      );
    }}
  />
);

export default CustomFormField;
