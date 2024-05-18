import DataTable from "@/components/DashboardForm/DataTable";
import { Card } from "@/components/ui/card";



const ArchivePage = () => {
    return (
        <Card>
            <DataTable showArchived={true} />
        </Card>
    )
}

export default ArchivePage