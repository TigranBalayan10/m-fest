import DataTable from "@/components/DashboardForm/DataTable";
import { Card } from "@/components/ui/card";



const ArchivePage = () => {
    return (
        <Card>
            <DataTable endpoint="/api/archive"/>
        </Card>
    )
}

export default ArchivePage