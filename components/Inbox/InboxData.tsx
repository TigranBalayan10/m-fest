"use client"

import { FaPhone, FaCalendar } from "react-icons/fa6";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
    CollapsibleTrigger,
    CollapsibleContent,
    Collapsible,
} from "@/components/ui/collapsible";
import prisma from "@/lib/prisma";
import { Message } from "@/lib/types";
import { formatDate } from "@/lib/FormatDate";
import { getInitials } from "@/lib/GetInitials";


const InboxData = ({ contact }: { contact: Message }) => (
    <Collapsible className="group">
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
        <CollapsibleContent className="px-6 py-4 text-sm">
            <p>{contact.message}</p>
            <div className="mt-4 flex items-center justify-between text-gray-500 dark:text-gray-400">
                <div>
                    <FaPhone className="w-4 h-4 mr-2 mb-2" />
                    {contact.phone}
                </div>
                <div>
                    <FaCalendar className="w-4 h-4 mr-2 mb-2" />
                    {formatDate(contact.createdAt)}
                </div>
            </div>
        </CollapsibleContent>
    </Collapsible>
);

export default InboxData;