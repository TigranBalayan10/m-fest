import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib//FormatDate";
import { FinancingDataTypes } from "@/lib/Types/FinancingFormTypes";

const FinancingRequestCard = ({ financing }: { financing: FinancingDataTypes }) => {
  const { personal, contact, createdAt } = financing;

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Financing Request</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Personal Information</p>
            <p>Name: {`${personal?.firstName} ${personal?.middleName || ""} ${personal?.lastName}`}</p>
            <p>SSN/ITIN: {personal?.ssnItin}</p>
            <p>Date of Birth: {personal?.dob}</p>
          </div>
          <div>
            <p className="font-semibold">Contact Information</p>
            <p>Phone: {contact?.phone}</p>
            <p>Email: {contact?.email}</p>
            <p>Address: {contact?.address}</p>
            <p>City: {contact?.city}</p>
            <p>State: {contact?.state}</p>
            <p>ZIP: {contact?.zip}</p>
          </div>
        </div>
        <p className="mt-4">Requested On: {formatDate(createdAt)}</p>
      </CardContent>
    </Card>
  );
};


export default FinancingRequestCard;