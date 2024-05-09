import InputForm from "@/components/DashboardForm/inputForm"
import prisma from "@/lib/prisma"

async function getCar(id: string) {
    const car = await prisma.carList.findUnique({
        where: {
            id: id
        }
    })
    
    return car 
}

const EditInventory = async ({ params }: { params: { id: string } }) => {
    const car = await getCar(params.id)
    return (

            <div className='container mx-auto px-4 sm:px-0 p-4 flex flex-col gap-4 items-center justify-center'>
                <InputForm mode="edit" initialData={car || undefined}/>
            </div>
    )
}

export default EditInventory;