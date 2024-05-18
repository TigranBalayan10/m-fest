"use client"

import InboxData from "@/components/Inbox/InboxData";
import InboxSkeleton from "@/components/Inbox/InboxSkeleton";
import { Message } from "@/lib/types";
import useSWR from 'swr';

async function fetcher() {
    const response = await fetch('/api/get-contact-message');
    const data = await response.json();
    return data;

}

const Inbox = () => {

    const { data, isLoading, error } = useSWR('/api/get-contact-message', fetcher);


    if (isLoading) {
        return <InboxSkeleton />
    }
    if (error) {
        return <div>Failed to load</div>
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md dark:bg-gray-950">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Inbox</h2>
                </div>
                <div className="divide-y divide-gray-200">
                    <div className="group">
                        {data?.contactData?.map((contact: Message, index: number) =>
                            <InboxData key={index} contact={contact} />
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Inbox;
