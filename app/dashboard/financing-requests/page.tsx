import DashboardFinancingData from "@/components/DashboardFinancing/DashboardFinancingData"
import { CardTitle } from "@/components/ui/card"

const FinancingRequestsPage = () => {
    return (
        <div className="mt-6">
            <CardTitle className="mb-4 text-center">Financing Requests</CardTitle>
            <DashboardFinancingData />
        </div>
    )
}

export default FinancingRequestsPage