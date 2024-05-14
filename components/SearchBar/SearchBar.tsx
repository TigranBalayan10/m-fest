"use client";

import React, { useState } from "react";
import SearchSelect from "./SearchSelect";
import { Button } from "../ui/button";
import CarMilages from "@/lib/Data/CarMilages.json";
import PriceRanges from "@/lib/Data/PriceRanges.json";
import CarModels from "@/lib/Data/CarModels.json";

const SearchBar = () => {
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const yearsOptions = selectedModel
    ? [
      {
        value:
          CarModels.find((car) => car.model_series === selectedModel)
            ?.years || "",
        label:
          CarModels.find((car) => car.model_series === selectedModel)
            ?.years || "",
      },
    ]
    : [];
  const vehicleClassOptions = selectedYear
    ? [
      {
        value:
          CarModels.find((car) => car.years === selectedYear)
            ?.vehicle_class || "",
        label:
          CarModels.find((car) => car.years === selectedYear)
            ?.vehicle_class || "",
      },
    ]
    : [];
  return (
    <div className="my-5 flex-grow mx-5">
      <div className="container mx-auto bg-slate-600 rounded-md shadow-lg px-4 md:px-0 p-5">
        <h1 className="text-2xl font-bold text-center mb-6">Search for your next BMW</h1>
        <form className="flex flex-col md:flex-row justify-center gap-3">
          <SearchSelect
            placeholder="Search for Model"
            options={CarModels.map((car) => ({
              value: car.model_series,
              label: car.model_series,
            }))}
            onChange={setSelectedModel}
          />
          <SearchSelect
            placeholder="Year"
            options={yearsOptions}
            onChange={setSelectedYear}
          />
          <SearchSelect
            placeholder="Vehicle Class"
            options={vehicleClassOptions}
          />
          <SearchSelect placeholder="Milage" options={CarMilages} />
          <SearchSelect placeholder="Price Range" options={PriceRanges} />
          <Button>Search</Button>
          <Button>Reset</Button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
