import DataTable from "@/components/DashboardForm/DataTable"
import { Card, CardTitle } from "@/components/ui/card"



const DashboardInventory = () => {
    return (
        <div className="mt-6">
            <CardTitle className="mb-4 text-center">Inventory</CardTitle>
            <DataTable endpoint="/api/inventory" />
        </div>
    )
}

export default DashboardInventory