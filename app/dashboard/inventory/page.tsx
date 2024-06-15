import { Card, CardTitle } from "@/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import prisma from "@/lib/prisma";

async function getInventoryData() {
    try {
        const inventoryData = await prisma.carList.findMany();
        return inventoryData;
    } catch (error) {
        console.error("Error fetching inventory data:", error);
        return [];
    }
}

const DashboardInventory = async () => {
    const inventoryData = await getInventoryData();

    return (
        <div className="mt-6">
            <CardTitle className="mb-4 text-center">Inventory</CardTitle>
            <DataTable columns={columns} data={inventoryData} />
        </div>
    );
};

export default DashboardInventory;