import InputForm from "@/components/DashboardForm/inputForm"
import prisma from "@/lib/prisma"

async function getCar (id: string) {
    const car = await prisma.carList.findUnique({
        where: {
            id: id
        }
    })
    return car || undefined
}

const EditInventory = async ({ params }: { params: { id: string } }) => {
    const car = await getCar(params.id)
    return (
        <>
            <div className='container mx-auto px-4 sm:px-0 bg-slate-700 p-4 flex flex-col gap-4'>
                <div className="p-5 text-center">
                    <h1 className='text-2xl sm:text-4xl font-bold text-white'>Edit Inventory</h1>
                    <h2 className='text-xl sm:text-2xl text-white'>Fill out the form below to edit inventory</h2>
                </div>
                <div className='container mx-auto px-4 sm:px-0 bg-slate-700 p-4 flex flex-col gap-4 items-center justify-center'>
                    <InputForm mode="edit" initialData={car}/>
                </div>
            </div>
        </>
    )
}

export default EditInventory;