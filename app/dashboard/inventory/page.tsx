import DataTable from "@/components/DashboardForm/DataTable"
import { Card } from "@/components/ui/card"



const DashboardInventory = () => {
    return (
        <div className="mt-6">
            <Card>
                <DataTable endpoint="/api/inventory" />
            </Card>
        </div>
    )
}

export default DashboardInventory