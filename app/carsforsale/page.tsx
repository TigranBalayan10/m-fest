import prisma from "@/lib/prisma"
async function getCars() {
    const cars = await prisma.carList.findMany({
        include: {
            Images: true
        }
    })
    return cars
}


const CarsForSale = async () => {
    const cars = await getCars()
    console.log(cars)
    return (
        <div>
            <h1>Cars For Sale</h1>
            <h4>{cars[0].make}</h4>
            <h2>{cars[0].Images[0].url}</h2>
        </div>
    )
}

export default CarsForSale