import React from 'react';
import { Control } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '../ui/input';
import { z } from 'zod';
import { CarListSchema } from '@/lib/zodSchema';

type FormData = z.infer<typeof CarListSchema>;

interface FormFieldProps {
    control: Control<FormData>;
    name: keyof FormData;
    placeholder: string;
}

const CustomFormField: React.FC<FormFieldProps> = ({ control, name, placeholder }) => (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <Input placeholder={placeholder} {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );

export default CustomFormField;