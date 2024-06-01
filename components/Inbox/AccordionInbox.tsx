// AccordionInbox.jsx
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

interface AccordionInboxProps {
    isMobile?: boolean;
}


const AccordionInbox: React.FC<AccordionInboxProps> = ({ isMobile = false }) => {

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="inbox">
                <AccordionTrigger className="flex justify-start gap-2 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200">
                    <FaMessage />
                    Messages
                </AccordionTrigger>
                <AccordionContent>
                    <ul className="mt-2 space-y-1">
                        <li>
                            {isMobile ? (
                                <SheetClose asChild>
                                    <Link href="/dashboard/inbox">
                                        <Button variant="link" className="w-full justify-start">
                                            <FaInbox className="mr-2"  />
                                            Inbox
                                        </Button>
                                    </Link>
                                </SheetClose>
                            ) : (
                                <Link href="/dashboard/inbox">
                                    <Button variant="link" className="w-full justify-start">
                                        <FaInbox className="mr-2"  />
                                        Inbox
                                    </Button>
                                </Link>
                            )}
                        </li>
                        <li>
                            {isMobile ? (
                                <SheetClose asChild>
                                    <Link href="/dashboard/inbox/archive">
                                        <Button variant="link" className="w-full justify-start">
                                            <IoArchiveSharp className="mr-2"  />
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