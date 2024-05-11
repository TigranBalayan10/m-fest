"use server";

import InboxData from "@/components/Inbox/InboxData";
import GetNewMessagesButton from "@/components/Inbox/GetNewMessagesButton";
import prisma from "@/lib/prisma";

async function getMessages() {
    const messages = await prisma.contact.findMany({});
    return messages;
}

const Inbox = async () => {
    const contactData = await getMessages();

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-50">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-lg font-semibold">Inbox</h2>
                    <GetNewMessagesButton />
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    <div className="group">
                        {contactData.map((contact, index) =>
                            <InboxData key={index} contact={contact} />
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Inbox;
