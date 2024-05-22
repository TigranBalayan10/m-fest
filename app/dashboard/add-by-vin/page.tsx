"use client";
import InputForm from "@/components/DashboardForm/inputForm"
import { CarListData } from "@/lib/zodSchema"
import { VinNumber, VinSchema } from "@/lib/zodSchema"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaSpinner } from "react-icons/fa6"
import InputField from "@/components/CustomUi/InputField"
import useVinData from "@/lib/fetchVinDecodeData"



const AddByVin = () => {

    const vin = "WBSAE0C0XLCD77497"
    const { decodeData, engineData, milageData, error } = useVinData(vin);

    if (error) {
        // Handle the error
        return <div>Error: {error.message}</div>;
    }

    if (!decodeData || !engineData || !milageData) {
        // Handle loading state
        return <div>Loading...</div>;
    }

    const engineInfo = engineData.data[0];

    return (
        <>
            <h1>Add By Vin</h1>
            <h2> Data for VIN : {vin}</h2>
            <p>Year: {decodeData.year}</p>
            <p>Make: {decodeData.make}</p>
            <p>Model: {decodeData.model}</p>
            <p>Trim: {decodeData.trim}</p>

            <h2>Engine Data:</h2>
            <h2>Engine Data:</h2>
            <p>Engine Type: {engineInfo.engine_type || "N/A"}</p>
            <p>Fuel Type: {engineInfo.fuel_type || "N/A"}</p>
            <p>Cylinders: {engineInfo.cylinders || "N/A"}</p>
            <p>Size: {engineInfo.size || "N/A"}</p>
        </>
    );
}

export default AddByVin