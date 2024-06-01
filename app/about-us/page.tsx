import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IoCar, IoCarSportSharp } from "react-icons/io5";
import { FaRegHandshake, FaTruckFront } from "react-icons/fa6";
import Image from "next/image"


const AboutUs = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="relative h-[600px] md:h-[800px]">
                <Image src="/bmw-m8.jpg" fill alt="BMW M8 for about us page" className=" object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">M-fest MotorSport</h1>
                    <p className="text-lg md:text-2xl max-w-3xl">
                        Discover the ultimate car buying experience with our unparalleled selection and exceptional customer
                        service.
                    </p>
                </div>
            </header>
            <main className="flex-1 py-16">
                <section className="container mx-auto px-4 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <IoCarSportSharp className="w-12 h-12 text-gray-300 mb-4" />
                            <h2 className="text-2xl font-bold mb-2 text-gray-400">Our History</h2>
                            <p className="text-gray-300 leading-relaxed">
                                M-Fest MotorSport has been a trusted name in the automotive industry for over 50 years. Founded in
                                1970, we have grown from a small family-owned business to a leading dealership in the region, offering a
                                wide range of vehicles and exceptional service.
                            </p>
                        </div>
                        <div>
                            <FaRegHandshake className="w-12 h-12 text-gray-300 mb-4" />
                            <h2 className="text-2xl font-bold mb-2 text-gray-400">Customer Service</h2>
                            <p className="text-gray-300 leading-relaxed">
                                At M-Fest MotorSport, we believe that customer satisfaction is the key to our success. Our
                                knowledgeable and friendly staff are dedicated to providing you with a hassle-free car buying
                                experience, from the moment you step onto our lot until you drive away in your dream car.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="container mx-auto px-4 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <IoCarSportSharp className="w-12 h-12 text-gray-300 mb-4" />
                            <h2 className="text-2xl font-bold mb-2 text-gray-400">Sedans</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Explore our extensive collection of sedans, ranging from fuel-efficient compacts to luxurious full-size
                                models, perfect for families or commuters.
                            </p>
                        </div>
                        <div>
                            <IoCarSportSharp className="w-12 h-12 text-gray-300 mb-4" />
                            <h2 className="text-2xl font-bold mb-2 text-gray-400">SUVs</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Whether you're seeking adventure or need extra space for your family, our selection of SUVs offers
                                versatility, power, and style to suit your lifestyle.
                            </p>
                        </div>
                        <div>
                            <FaTruckFront className="w-12 h-12 text-gray-300 mb-4" />
                            <h2 className="text-2xl font-bold mb-2 text-gray-400">Trucks</h2>
                            <p className="text-gray-300 leading-relaxed">
                                From rugged work trucks to stylish pickups, our truck lineup provides the power and capability you need
                                for any job or outdoor adventure.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="container mx-auto px-4 mb-16 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-400">Start Your Car Buying Journey</h2>
                    <p className="text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                        Whether you're looking for a reliable family car, a powerful truck, or a luxurious sports car, our team is
                        here to help you find the perfect vehicle to suit your needs and budget.
                    </p>
                    <Button>
                        <Link href="/inventory">
                            Browse Inventory
                        </Link>
                    </Button>
                </section>
            </main>
        </div>
    )
}

export default AboutUs