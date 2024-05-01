import InputForm from "@/components/DashboardForm/inputForm"

const AddInventory = () => {
    return (
        <div className='container mx-auto px-4 sm:px-0 bg-slate-700 p-4 flex flex-col gap-4'>
            <div className="p-5 text-center">
                <h1 className='text-2xl sm:text-4xl font-bold text-white'>Add Inventory</h1>
                <h2 className='text-xl sm:text-2xl text-white'>Fill out the form below to add inventory</h2>
            </div>
            <div className='container mx-auto px-4 sm:px-0 bg-slate-700 p-4 flex flex-col gap-4 items-center justify-center'>

                <InputForm />
            </div>
        </div>
    )
}

export default AddInventory