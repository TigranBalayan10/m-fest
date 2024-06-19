import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react";
import AlertDelete from "./AlertDelete";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ToolTip from "./ToolTip";

interface ActionsCellProps<TData> {
    data: TData;
    isRowSelected: boolean;
}



const ActionsCell = <TData extends { id?: string, make?: string, model?: string, name?: string },>({
    data,
    isRowSelected,
}: ActionsCellProps<TData>) => {
    const pathname = usePathname();
    return (
        <div className="text-right">
            {pathname === "/dashboard/customers" ? (
                <ToolTip
                    itemId={data.id}
                    tooltipText="Delete Customer"
                    actionEndpoint="delete-customer"
                    httpMethod="DELETE"
                    title={`${data.name} from your DB`}
                    getEndpoint="get-customers"
                />
            ) : (
                <>
                    {!isRowSelected ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <ul className="py-1 flex flex-col">
                                        <li>
                                            <AlertDelete
                                                title={data.make + " " + data.model}
                                                itemId={data.id || ""}
                                                actionEndpoint="delete-inventory"
                                                actionName="Delete"
                                                httpMethod="DELETE"
                                                link="link"
                                            />
                                        </li>
                                        <li>
                                            <Link href={`/dashboard/edit-inventory/${data.id}`}>
                                                <Button variant="link" className="text-primary p-2">
                                                    Edit
                                                </Button>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={`/dashboard/inventory/${data.id}`}>
                                                <Button variant="link" className="text-primary p-2">
                                                    Details
                                                </Button>
                                            </Link>
                                        </li>
                                        <li>
                                            <AlertDelete
                                                title={data.make + " " + data.model}
                                                itemId={data.id || ""}
                                                actionEndpoint="archive-inventory"
                                                actionName="Archive"
                                                httpMethod="PUT"
                                                link="link"
                                                getEndpoint="inventory"
                                            />
                                        </li>
                                    </ul>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : null}
                </>
            )}
        </div>
    );
};

export default ActionsCell;