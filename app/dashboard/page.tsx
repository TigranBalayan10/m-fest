import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import CustomersDataCard from "@/components/DashboardCards/CustomersDatacard";
import Link from "next/link";
import InventoryDataTable from "@/components/DataTable/InventoryDataTable";
import InventoryDataCard from "@/components/DashboardCards/InventoryDatacard";


export default function Dashboard() {
  auth().protect();

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <CustomersDataCard />
          <InventoryDataCard />
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
        <>
          <InventoryDataTable />
        </>
      </div>
    </>
  );
}
