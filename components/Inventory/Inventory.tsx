import prisma from "@/lib/prisma";
import CarCard from "./CarCard";
async function getCars() {
  const cars = await prisma.carList.findMany({});
  return cars;
}

const CarsForSale = async () => {
  const cars = await getCars();

  return (
    <div className="mt-5 flex-grow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-teal-200 h-full container mx-auto p-4">
        {cars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarsForSale;
