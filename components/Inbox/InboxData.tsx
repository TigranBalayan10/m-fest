"use client"

import { FaPhone, FaCalendar } from "react-icons/fa6";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
    CollapsibleTrigger,
    CollapsibleContent,
    Collapsible,
} from "@/components/ui/collapsible";
import { Message } from "@/lib/types";
import { formatDate } from "@/lib/FormatDate";
import { getInitials } from "@/lib/GetInitials";
import { AiOutlineDelete } from "react-icons/ai";
import ToolTip from "../CustomUi/ToolTip";
import { Separator } from "../ui/separator";


const InboxData = ({ contact }: { contact: Message }) => (
    <Collapsible className="group">
        <Separator />
        <CollapsibleTrigger className="w-full flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage alt={contact.name} />
                    <AvatarFallback>{getInitials(contact.name).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {contact.email}
                    </div>
                </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(contact.createdAt)}
            </div>
        </CollapsibleTrigger>
        <Separator className="mt-1" />
        <CollapsibleContent className="px-6 py-4 text-sm">
            <h1 className="text-center font-bold mb-2">Message From Customer</h1>
            <p>{contact.message}</p>
            <Separator className="mt-3" />
            <div className="mt-4 flex items-center justify-between text-gray-500 dark:text-gray-400">
                <div className="text-gray-500 text-xs md:text-base">
                    <FaPhone className="w-4 h-4 mr-2 mb-2" />
                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </div>
                <ToolTip tooltipText="Delete message"
                    itemId={contact.id} actionEndpoint="delete-message" httpMethod="DELETE" title="Message"
                >
                    <AiOutlineDelete className="text-red-500 w-5 h-5" />
                </ToolTip>
                <div className="flex items-center gap-5">
                    <div className="text-gray-500 text-xs md:text-base">
                        <FaCalendar className="w-4 h-4 mr-2 mb-2" />
                        {formatDate(contact.createdAt)}
                    </div>
                </div>
            </div>
        </CollapsibleContent>
    </Collapsible>
);

export default InboxData;