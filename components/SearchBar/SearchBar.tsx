"use client";

import React, { useState } from "react";
import SearchSelect from "./SearchSelect";
import { Button } from "../ui/button";
import CarMilages from "@/lib/Data/CarMilages.json";
import { PriceRanges } from "@/lib/Data/PriceRanges";
import CarModels from "@/lib/Data/CarModels.json";
import { SearchData, SearchSchema, CarListData } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import useSWR from "swr";

async function fetcher() {
  const response = await fetch('/api/inventory');
  const data = await response.json();
  return data;

}

const SearchBar = () => {

  const { data, error, isLoading } = useSWR('/api/inventory', fetcher);
  const selectData = data?.carData;

  const yearOptions = selectData?.map((car: CarListData) => car.year);
  const titleOptions = selectData?.map((car: CarListData) => car.title);
  const makeOptions = selectData?.map((car: CarListData) => car.make);
  const milageOptions = CarMilages.map((milage) => milage.label);




  const form = useForm<SearchData>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      model: "",
      make: "",
      year: "",
      milage: "",
      priceRange: "",
    },
  })

  const { handleSubmit, watch, register, reset, formState: { errors } } = form;

  const onSubmit = (data: SearchData) => {
    // Handle form submission, e.g., send data to backend API
    console.log(data);
  };



  return (
    <div className="my-5 flex-grow mx-5">
      <div className="container mx-auto bg-slate-600 rounded-md shadow-lg px-4 md:px-0 p-5">
        <h1 className="text-2xl font-semibold text-center text-blue-400 mb-6">Search for your next BMW</h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-5">
            <div className="px-5 flex flex-col md:flex-row md:justify-center gap-3">
              <SearchSelect
                control={form.control}
                name="model"
                options={titleOptions}
                label="Model"
                placeholder="Select Model"
              />
              <SearchSelect
                control={form.control}
                name="make"
                options={makeOptions}
                label="Make"
                placeholder="Select Make"
              />
              <SearchSelect
                control={form.control}
                name="year"
                options={yearOptions}
                label="Year"
                placeholder="Select Year"
              />
              <SearchSelect
                control={form.control}
                name="milage"
                options={milageOptions}
                label="Milage"
                placeholder="Select Milage Range"
              />
              <SearchSelect
                control={form.control}
                name="priceRange"
                options={PriceRanges.map((range) => `$ ${range.min} - ${range.max}`)}
                label="Price Range"
                placeholder="Select Price Range"
              />
            </div>
            <div className="flex justify-center gap-2">
              <Button type="submit" size="lg">Search</Button>
              <Button type="button" size="lg" onClick={() => reset()}>
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SearchBar;
