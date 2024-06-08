import DataTable from "@/components/DashboardForm/DataTable";
import { Card, CardTitle } from "@/components/ui/card";



const ArchivePage = () => {
    return (
        <div className="mt-6">
            <CardTitle className="mb-4 text-center">Inventory Archive</CardTitle>
            <DataTable endpoint="/api/archive" />
        </div>
    )
}

export default ArchivePage