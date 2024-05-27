"use client";

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FaCheck, FaRegTrashCan, FaBoxArchive, FaCircleDot } from "react-icons/fa6";
import MessageFull from "./MessageFull";
import { fetcher } from "@/lib/swrFetcher";
import { Contact } from "@/lib/Types/ContactUsTypes";
import { formatDate } from "@/lib/FormatDate";
import useSWR from "swr";
import InboxSkeleton from "./InboxSkeleton";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MarkedReadSchema } from "@/lib/zodSchema";
import { Form } from "../ui/form";
import CheckboxForm from "../CustomUi/CheckboxForm";

export default function InboxList() {

    const form = useForm<z.infer<typeof MarkedReadSchema>>({
        resolver: zodResolver(MarkedReadSchema),
        defaultValues: {
            ids: []
        }
    })

    const onSubmit = async (data: z.infer<typeof MarkedReadSchema>) => {
        console.log(data)
        try {
            const response = await fetch('/api/update-message', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response, "response")
            if (response.ok) {
                form.reset()
                console.log('Marked as read')
            } else {
                console.log('Failed to mark as read')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }
    const { data, isLoading, error } = useSWR('/api/get-all-messages', fetcher);
    const allMessages: Contact[] = data?.contactData;
    const newMessages: Contact[] = data?.newMessages;
    const archivedMessages = data?.archivedMessages;


    if (isLoading) {
        return <InboxSkeleton />
    }
    if (error) {
        return <div>Failed to load</div>
    }



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="w-full max-w-3xl mx-auto py-6 px-4 md:px-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <Button variant="outline">
                                <FaCheck className="w-4 h-4 mr-1" type="submit" />
                                Mark as read
                            </Button>
                            <Button variant="destructive">
                                <FaRegTrashCan className="w-4 h-4 mr-1" />
                                Delete
                            </Button>
                            <Button variant="archive">
                                <FaBoxArchive className="w-4 h-4 mr-1" />
                                Archive
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-4">

                        {allMessages?.map((message) => (
                            <div key={message.id} className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-100">
                                <CheckboxForm control={form.control} name="ids" contactId={message.id} key={message.id} />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="font-semibold">{message.customer.name}</div>
                                        <div className="text-sm text-gray-500">{formatDate(message.createdAt)}</div>
                                    </div>
                                    <div className="text-sm font-medium">{message.customer.email}</div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500 line-clamp-2 mr-4">
                                            {message.message}
                                        </p>
                                        <MessageFull nameFull={message.customer.name} date={formatDate(message.createdAt)}
                                            message={message.message} phone={message.customer.phone} />
                                        {message.isNew && <FaCircleDot className="text-blue-500" />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </Form>
    )
}

