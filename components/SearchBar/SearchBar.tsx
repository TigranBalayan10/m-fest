"use client";

import React, { useState } from "react";
import SearchSelect from "./SearchSelect";
import { Button } from "../ui/button";
import CarMilages from "@/lib/Data/CarMilages.json";
import { PriceRanges } from "@/lib/Data/PriceRanges";
import { SearchData, SearchSchema, CarListData } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import useSWR from "swr";
import { fetcher } from "@/lib/swrFetcher";
import { FaSpinner } from "react-icons/fa6";

interface SearchBarProps {
  onSearch: (result: CarListData[], params: SearchData) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [isSearching, setIsSearching] = useState(false);
  const { data, error, isLoading } = useSWR('/api/inventory', fetcher);
  const selectData = data?.carData;
  // Create a Map to store unique makes and their corresponding models
  const makeToModelsMap = new Map<string, Set<string>>();
  const modelToYearsMap = new Map<string, Set<string>>();

  // Populate the makeToModelsMap
  selectData?.forEach((car: CarListData) => {
    const { make, model, year } = car;
    // Update makeToModelsMap
    const modelSet = makeToModelsMap.get(make) || new Set();
    modelSet.add(model);
    makeToModelsMap.set(make, modelSet);
    // Update modelToYearsMap
    const yearSet = modelToYearsMap.get(model) || new Set();
    yearSet.add(year);
    modelToYearsMap.set(model, yearSet);
  });

  // Create a unique list of makes
  const makeOptions = Array.from(makeToModelsMap.keys());

  // Create a function to get models for a specific make
  const getModelsForMake = (make: string) => {
    const modelSet = makeToModelsMap.get(make);
    return modelSet ? Array.from(modelSet) : [];
  };

  const getYearsForMake = (model: string) => {
    const yearSet = modelToYearsMap.get(model);
    return yearSet ? Array.from(yearSet) : [];
  };
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
  const selectedMake = watch("make") || "";
  const selectedModel = watch("model") || "";

  const resetForm = () => {
    reset();
  };

  async function onSubmit(data: SearchData) {
    setIsSearching(true);
    console.log("Search data:", data);
    try {
      const response = await fetch('/api/search-inventory', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const searchResults = await response.json();
        console.log("Search results:", searchResults);
        onSearch(searchResults, data);
      } else {
        console.error("Failed to send search request");
      }
    } catch (error) {
      console.error("Error sending search request:", error);
    }
    setIsSearching(false);
  };

  return (
    <div className="my-5 flex-grow mx-5">
      <div className="container mx-auto card-bg rounded-md shadow-lg px-4 md:px-0 p-5">
        <h1 className="text-2xl font-semibold text-center text-blue-400 mb-6">Search for your next BMW</h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-5">
            <div className="px-5 flex flex-col md:flex-row md:justify-center gap-3">
              <SearchSelect
                control={form.control}
                name="make"
                options={makeOptions}
                label="Make"
                placeholder="Select Make"
              />
              <SearchSelect
                control={form.control}
                name="model"
                options={getModelsForMake(selectedMake)}
                label="Model"
                placeholder="Select Model"
                previousLabel="Make"
              />
              <SearchSelect
                control={form.control}
                name="year"
                options={getYearsForMake(selectedModel)}
                label="Year"
                placeholder="Select Year"
                previousLabel="Model"
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
              {isSearching ? (
                <Button type="button" size="lg" disabled>
                  <FaSpinner className="animate-spin mr-2" />
                  Searching...
                </Button>
              ) : (
                <Button type="submit" size="lg">
                  Search
                </Button>
              )}
              <Button type="button" size="lg" onClick={resetForm}>
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
