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
import { Car } from "@/lib/types";
import Link from "next/link";

interface ActionsCellProps {
    car: Car;
    isRowSelected: boolean;
}



const ActionsCell = ({ car, isRowSelected }: ActionsCellProps) => {

    return (
        <div className="text-right">
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
                                        title={car.make + " " + car.model}
                                        itemId={car.id || ""}
                                        actionEndpoint="delete-inventory"
                                        actionName="Delete"
                                        httpMethod="DELETE"
                                        link="link"
                                    />
                                </li>
                                <li>
                                    <Link href={`/dashboard/edit-inventory/${car.id}`}>
                                        <Button variant="link" className="text-primary p-2">
                                            Edit
                                        </Button>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/dashboard/inventory/${car.id}`}>
                                        <Button variant="link" className="text-primary p-2">
                                            Details
                                        </Button>
                                    </Link>
                                </li>
                                <li>
                                    <AlertDelete
                                        title={car.make + " " + car.model}
                                        itemId={car.id || ""}
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
        </div>
    );
};

export default ActionsCell;