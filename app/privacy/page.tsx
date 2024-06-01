import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


const PrivacyPolicy = () => {
    return (
        <div className="flex justify-center items-center min-h-screen m-3">
            <Card className="max-w-3xl">
                <CardHeader>
                    <CardTitle>Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-base leading-6">
                        At [Dealership Name], we are committed to protecting the privacy and security of our customers' personal information. This privacy policy explains how we collect, use, and safeguard the information you provide to us.
                    </p>
                    <h2 className="mt-6 text-xl font-bold">Information We Collect</h2>
                    <p className="mt-2 text-base leading-6">
                        We may collect personal information from you when you visit our dealership, fill out a form on our website, or interact with us in other ways. This information may include:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-base leading-6">
                        <li>Name and contact information (email address, phone number, mailing address)</li>
                        <li>Financial information (credit application data, bank account numbers)</li>
                        <li>Vehicle information (VIN, make, model, year)</li>
                        <li>Demographic information (age, income, occupation)</li>
                    </ul>
                    <h2 className="mt-6 text-xl font-bold">How We Use Your Information</h2>
                    <p className="mt-2 text-base leading-6">
                        We use the information we collect to provide you with the products and services you request, to communicate with you about your account or transactions, and to improve our services. We may also use your information for marketing purposes, such as sending you promotional offers or newsletters.
                    </p>
                    <h2 className="mt-6 text-xl font-bold">Sharing Your Information</h2>
                    <p className="mt-2 text-base leading-6">
                        We may share your personal information with third parties in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-base leading-6">
                        <li>With service providers who assist us in operating our website or conducting our business</li>
                        <li>With financial institutions for the purpose of financing or leasing a vehicle</li>
                        <li>With law enforcement or government agencies when required by law</li>
                        <li>In connection with a merger, acquisition, or sale of our business assets</li>
                    </ul>
                    <h2 className="mt-6 text-xl font-bold">Data Security</h2>
                    <p className="mt-2 text-base leading-6">
                        We take reasonable precautions to protect your personal information from loss, misuse, and unauthorized access, disclosure, alteration, or destruction. However, no data transmission over the internet or electronic storage system can be guaranteed to be 100% secure.
                    </p>
                    <h2 className="mt-6 text-xl font-bold">Your Rights and Choices</h2>
                    <p className="mt-2 text-base leading-6">
                        You have the right to access, update, or delete your personal information at any time. You may also opt-out of receiving marketing communications from us by following the instructions in those messages.
                    </p>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-gray-500">
                        If you have any questions or concerns about our privacy policy, please contact us at [Dealership Email Address] or [Dealership Phone Number].
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default PrivacyPolicy