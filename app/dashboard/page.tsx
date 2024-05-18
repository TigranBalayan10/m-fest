import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import DataTable from "@/components/DashboardForm/DataTable";
import { auth } from "@clerk/nextjs/server";


export default function Dashboard() {
  auth().protect();
  return (

    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-sm text-gray-500">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-sm text-gray-500">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-sm text-gray-500">+19% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
        <DataTable endpoint="/api/inventory"/>
        </Card>
      </div>
    </>
  );
}
