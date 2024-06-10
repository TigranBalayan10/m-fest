"use client";
import Inventory from "@/components/Inventory/Inventory"
import SearchBar from "@/components/SearchBar/SearchBar"
import { CarListData, SearchData } from "@/lib/zodSchema"
import { useState } from "react"
import DealsHot from "@/components/Inventory/DealsHot";


const InventoryPage = () => {
    const [searchResult, setSearchResult] = useState<CarListData[]>([])
    const [searchParams, setSearchParams] = useState<SearchData>({})
    const handleSearch = (result: CarListData[], params: SearchData) => {
        setSearchResult(result)
        setSearchParams(params)
    }
    return (
        <>
            <DealsHot />
            <SearchBar onSearch={handleSearch} />
            <Inventory searchResults={searchResult} searchParams={searchParams} />
        </>
    )
}

export default InventoryPage