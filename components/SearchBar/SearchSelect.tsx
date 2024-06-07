"use client"

import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SearchData } from "@/lib/zodSchema";

type FormData = SearchData;

interface SearchSelectProps {
  control: Control<FormData>;
  name: keyof FormData;
  options: string[];
  label: string;
  placeholder?: string;
  previousLabel?: string;
}

const SearchSelect: React.FC<SearchSelectProps> = ({
  control,
  name,
  label,
  options,
  placeholder,
  previousLabel,
}) => {
  return (

    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-slate-200">{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
            <FormControl>
              <SelectTrigger className="lg:w-[200px] text-black">
                <SelectValue placeholder={placeholder}>
                  {field.value}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.length > 0 ? (
                options.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="No Options">Please select {previousLabel} </SelectItem>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SearchSelect