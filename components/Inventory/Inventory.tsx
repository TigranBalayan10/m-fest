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
      <div className="flex flex-col sm:flex-row bg-teal-200 h-full container mx-auto justify-between p-4 gap-3">
        {cars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarsForSale;
