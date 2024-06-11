import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib//FormatDate";
import { FinancingDataTypes } from "@/lib/Types/FinancingFormTypes";

const FinancingRequestCard = ({ financing }: { financing: FinancingDataTypes }) => {
  const { personal, contact, car, createdAt } = financing;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center mb-4">Financing Request</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Car Information</h3>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-lg"><strong>Stock Number:</strong> {`${car.stockNumber}`}</p>
              <p className="text-lg"><strong>Make/Model:</strong> {`${car.make} ${car.model}`}</p>
              <p className="text-lg"><strong>VIN:</strong> {car.vin}</p>
              <p className="text-lg"><strong>Price:</strong> {`$${car.price}`}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-lg"><strong>Name:</strong> {`${personal.firstName} ${personal.middleName || ""} ${personal?.lastName}`}</p>
              <p className="text-lg"><strong>SSN/ITIN:</strong> {personal.ssnItin}</p>
              <p className="text-lg"><strong>Date of Birth:</strong> {personal.dob}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-lg"><strong>Phone:</strong> {contact.phone}</p>
              <p className="text-lg"><strong>Email:</strong> {contact.email}</p>
              <p className="text-lg"><strong>Address:</strong> {contact.address}</p>
              <p className="text-lg"><strong>City:</strong> {contact.city}</p>
              <p className="text-lg"><strong>State:</strong> {contact.state}</p>
              <p className="text-lg"><strong>ZIP:</strong> {contact.zip}</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-lg text-center">
            <strong>Requested On:</strong> {formatDate(createdAt)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};


export default FinancingRequestCard;