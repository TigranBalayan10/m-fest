"use client";
import InputForm from "@/components/DashboardForm/inputForm"
import { CarListData } from "@/lib/zodSchema"
import { VinNumber, VinSchema } from "@/lib/zodSchema"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaSpinner } from "react-icons/fa6"
import InputField from "@/components/CustomUi/InputField"
import useFetchVinDecodeData from "@/lib/fetchVinDecodeData"



const AddByVin = () => {

    const vin = "WBSAE0C0XLCD77497"
    useFetchVinDecodeData(vin)

    return (
        <>
            <h1>Add By Vin</h1>
            {/* Use decodeData here */}
        </>
    );
}

export default AddByVin