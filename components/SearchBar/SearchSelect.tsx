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
}

const SearchSelect: React.FC<SearchSelectProps> = ({
  control,
  name,
  label,
  options,
  placeholder,
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
              <SelectTrigger className="md:w-[200px] text-black">
                <SelectValue placeholder={placeholder}>
                  {field.value}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SearchSelect