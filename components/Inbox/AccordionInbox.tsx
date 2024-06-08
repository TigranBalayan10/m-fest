// AccordionInbox.jsx
"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "../ui/button";
import { FaInbox, FaMessage } from "react-icons/fa6";
import { IoArchiveSharp } from "react-icons/io5";
import { SheetClose } from "../ui/sheet";
import useSWR from "swr";
import { fetcher } from "@/lib/swrFetcher";
import { Message, Customer } from "@/lib/Types/ContactUsTypes";
import { RxDotFilled } from "react-icons/rx";

interface AccordionInboxProps {
    isMobile?: boolean;
}


const AccordionInbox: React.FC<AccordionInboxProps> = ({ isMobile = false }) => {

    const { data, isLoading, error } = useSWR("/api/get-all-messages", fetcher);
    const allCustomers = data?.messageData as Customer[];
    const allMessages = allCustomers
        ?.map((customer) => customer.message)
        .flat()
        .filter((message): message is Message => message !== null) as Message[];

    const unreadMessageQuantity = allMessages
        ?.filter((message) => message?.isNew === true)
        .length ?? 0;

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="inbox">
                <AccordionTrigger className="flex justify-start gap-2 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200">
                    <FaMessage />
                    Messages
                    {isLoading || error || unreadMessageQuantity === 0 ? null : <span className="ml-auto inline-flex items-center justify-center">
                        <RxDotFilled className="text-red-500 w-7 h-7" />
                    </span>
                    }
                </AccordionTrigger>
                <AccordionContent>
                    <ul className="mt-2 space-y-1">
                        <li>
                            {isMobile ? (
                                <SheetClose asChild>
                                    <Link href="/dashboard/inbox">
                                        <Button variant="link" className="w-full justify-start">
                                            <FaInbox className="mr-2" />
                                            Inbox
                                            {unreadMessageQuantity === 0 ? null : <span className="ml-auto inline-flex items-center justify-center bg-red-500 text-white rounded-full px-2 py-1 text-xs font-semibold no-underline">
                                                {unreadMessageQuantity}
                                            </span>}
                                        </Button>
                                    </Link>
                                </SheetClose>
                            ) : (
                                <Link href="/dashboard/inbox">
                                    <Button variant="link" className="w-full justify-start">
                                        <FaInbox className="mr-2" />
                                        Inbox
                                        {unreadMessageQuantity === 0 ? null : <span className="ml-auto inline-flex items-center justify-center bg-red-500 text-white rounded-full px-2 py-1 text-xs font-semibold no-underline">
                                            {unreadMessageQuantity}
                                        </span>}
                                    </Button>
                                </Link>
                            )}
                        </li>
                        <li>
                            {isMobile ? (
                                <SheetClose asChild>
                                    <Link href="/dashboard/inbox/archive">
                                        <Button variant="link" className="w-full justify-start">
                                            <IoArchiveSharp className="mr-2" />
                                            Archive
                                        </Button>
                                    </Link>
                                </SheetClose>
                            ) : (
                                <Link href="/dashboard/inbox/archive">
                                    <Button variant="link" className="w-full justify-start">
                                        <IoArchiveSharp className="mr-2" />
                                        Archive
                                    </Button>
                                </Link>
                            )}
                        </li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default AccordionInbox;