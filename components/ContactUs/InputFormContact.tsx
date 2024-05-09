import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { z } from 'zod';
import { ContactUsSchema } from '@/lib/zodSchema';

type FormData = z.infer<typeof ContactUsSchema>;

interface FormFieldProps {
  control: Control<FormData>;
  name: keyof FormData;
  placeholder: string;
}






const InputFormContact:React.FC<FormFieldProps> = ({ control, name, placeholder }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormControl>
                            {name === 'message' ?
                                <Textarea
                                rows={10}
                                    {...field}
                                    placeholder={placeholder}
                                />
                                :
                                <Input
                                    {...field}
                                    placeholder={placeholder}
                                />
                            }

                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    )
}

export default InputFormContact