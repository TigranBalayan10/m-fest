"use client";

import { FaPhone, FaCalendar } from "react-icons/fa6";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
    CollapsibleTrigger,
    CollapsibleContent,
    Collapsible,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/FormatDate";

interface Contact {
    id: string;
    name: string;
    email: string;
    message: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
}

const Inbox = () => {
    const [contactData, setContactData] = useState<Contact[]>([]);
    const [loadingContactData, setLoadingContactData] = useState(true);
    const url = process.env.NODE_ENV === 'production'
        ? "m-fest-179hiwk6r-tigran-balayans-projects.vercel.app/api/get-contact-message"
        : "http://localhost:3000/api/get-contact-message";
    useEffect(() => {
        async function getContactList() {
            const response = await fetch(url);
            const data = await response.json();
            setContactData(data.contactData);
            setLoadingContactData(false);
        }

        getContactList();
    }, []);

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-50">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-lg font-semibold">Inbox</h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {contactData.map((contact, index) => {
                        const nameParts = contact.name.split(" ");
                        const initials = `${nameParts[0][0]}${nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : ""}`;
                        const formattedDate = formatDate(contact.createdAt);

                        return (
                            <Collapsible key={index} className="group">
                                <CollapsibleTrigger className="w-full flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage alt={contact.name} />
                                            <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{contact.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {contact.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {formattedDate}
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
                                            {formattedDate}
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Inbox;
