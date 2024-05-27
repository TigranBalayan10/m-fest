import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FaCheck, FaRegTrashCan, FaBoxArchive, FaFilter, FaListOl } from "react-icons/fa6";
import  MessageFull  from "./MessageFull";

export default function InboxList() {
    return (
        <div className="w-full max-w-3xl mx-auto py-6 px-4 md:px-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <Button variant="outline">
                        <FaCheck className="w-4 h-4" />
                        Mark as read
                    </Button>
                    <Button variant="outline">
                        <FaRegTrashCan className="w-4 h-4" />
                        Delete
                    </Button>
                    <Button variant="outline">
                        <FaBoxArchive className="w-4 h-4 mr-1" />
                        Archive
                    </Button>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-100">
                    <Checkbox id="message-1" />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold">John Doe</div>
                            <div className="text-sm text-gray-500">2 days ago</div>
                        </div>
                        <div className="text-sm font-medium">Re: Important Update</div>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500 line-clamp-2 mr-4">
                                Hi John, I wanted to follow up on the important update I sent earlier this week. Please let me know if you have any questions or concerns.
                            </p>
                            <MessageFull nameFull="John Doe" date="12 March 2024 10:30PM" message="                                Hi John, I wanted to follow up on the important update I sent earlier this week. Please let me know if you have any questions or concerns." phone="8189132117" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

