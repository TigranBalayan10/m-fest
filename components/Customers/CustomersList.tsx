import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { TableCell, TableRow } from "../ui/table"
import { getInitials } from "@/lib/GetInitials"
import { Customer } from "@/lib/Types/ContactUsTypes"
import ToolTip from "../CustomUi/ToolTip"



const CustomersList = ({ customer }: { customer: Customer }) => {

    return (
        <TableRow key={customer.id}>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border">
                        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                        <p className="font-medium">{customer.name}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <a href={`tel:${customer.phone}`} className="hover:underline">{customer.phone}</a>
            </TableCell>
            <TableCell>
                <a href={`mailto:${customer.email}`} className="hover:underline">{customer.email}</a>
            </TableCell>
            <TableCell className="text-right">
                <ToolTip itemId={customer.id} tooltipText="Delete Customer" actionEndpoint="delete-customer" httpMethod="DELETE" title={`${customer.name} from your DB`} getEndpoint="get-customers" />
            </TableCell>
        </TableRow>
    )
}

export default CustomersList