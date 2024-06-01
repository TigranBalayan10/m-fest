import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"



const Licensing = () => {
    return (
        <div className="flex justify-center items-center min-h-screen m-3">
            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Licensing Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-base leading-6">
                        [Dealership Name] is a fully licensed and bonded motor vehicle dealership in the state of [State]. We are authorized by the [State] Department of Motor Vehicles to sell new and used vehicles, as well as provide related services such as financing, leasing, and maintenance.
                    </p>
                    <p className="mt-4 text-base leading-6">
                        Our dealership has been serving the [City/Region] area for over [Number] years, and we take pride in our commitment to customer satisfaction and ethical business practices. We are a member of the [State] Automobile Dealers Association and adhere to their strict code of conduct.
                    </p>
                    <p className="mt-4 text-base leading-6">
                        Dealership License Number: [License Number]<br />
                        Expiration Date: [Expiration Date]<br />
                        Bonding Company: [Bonding Company Name]<br />
                        Bond Number: [Bond Number]
                    </p>
                    <p className="mt-4 text-base leading-6">
                        For more information about our licensing or to verify our license status, please contact the [State] Department of Motor Vehicles:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-base leading-6">
                        <li>Phone: [DMV Phone Number]</li>
                        <li>Email: [DMV Email Address]</li>
                        <li>Website: [DMV Website]</li>
                    </ul>
                    <p className="mt-4 text-base leading-6">
                        At [Dealership Name], we believe in transparency and honesty in all our dealings. If you have any questions or concerns about our licensing or business practices, please don't hesitate to contact us directly at [Dealership Phone Number] or [Dealership Email Address].
                    </p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-gray-500">
                        This information is provided as required by state law and is subject to change without notice. Last updated on [Date].
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Licensing