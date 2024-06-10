"use client";

import { Button } from "@/components/ui/button"
import { FaCheck, FaRegTrashCan, FaBoxArchive, FaSpinner } from "react-icons/fa6";
import { RxDotFilled } from "react-icons/rx";
import MessageFull from "./MessageFull";
import { fetcher } from "@/lib/swrFetcher";
import { Customer } from "@/lib/Types/ContactUsTypes";
import { formatDate } from "@/lib/FormatDate";
import useSWR from "swr";
import InboxSkeleton from "./InboxSkeleton";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { z } from "zod"
import { MarkedReadSchema } from "@/lib/zodSchema";
import { Form } from "../ui/form";
import CheckboxForm from "../CustomUi/CheckboxForm";
import getOptimisticUpdate from "@/lib/mutate";
import { useToast } from "@/components/ui/use-toast";


export default function InboxList() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isArchiving, setIsArchiving] = useState(false);
    const { toast } = useToast();

    const { data, isLoading, error, mutate } = useSWR('/api/get-all-messages', fetcher);

    const form = useForm<z.infer<typeof MarkedReadSchema>>({
        resolver: zodResolver(MarkedReadSchema),
        defaultValues: {
            ids: []
        }
    })

    const { isSubmitting } = form.formState;

    const onSubmit = async (data: z.infer<typeof MarkedReadSchema>) => {
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
                mutate('/api/get-all-messages');
                form.reset();
                toast({
                    variant: "success",
                    title: "Success",
                    description: "Message marked as read successfully.",
                });
            } else {
                mutate();
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to mark message as read.",
                });
            }
        } catch (error) {
            console.error('Error:', error);
            mutate();
            toast({
                variant: "destructive",
                title: "Error:",
                description: "Failed to mark message as read.",
            });
        }
    }

    const handleViewMessage = async (messageId: string, isNew: boolean) => {
        if (isNew === false) {
            console.log('Message is already marked as read. No action needed.');
            return;
        }
        try {
            // Optimistic update for marking a message as viewed
            mutate(
                getOptimisticUpdate(messageId, (message) => ({
                    ...message,
                    isNew: false,
                })),
                false
            );
            const response = await fetch('/api/update-message', {
                method: 'PUT',
                body: JSON.stringify({
                    ids: [messageId], isNew: false, orderBy: {
                        createdAt: "asc"
                    }
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Message marked as viewed');
                mutate();
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to mark message as viewed.",
                });
                mutate();
            }
        } catch (error) {
            console.error('Error:', error);
            mutate();
        }
    };

    const onClickDelete = async (event: React.MouseEvent) => {
        event.preventDefault()
        const messageIds = form.getValues().ids;
        setIsDeleting(true);
        try {
            // Optimistic update for deleting messages
            messageIds.forEach((messageId: string) => {
                mutate(getOptimisticUpdate(messageId, () => undefined), false);
            });
            const response = await fetch('/api/delete-message', {
                method: 'DELETE',
                body: JSON.stringify(form.getValues()),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                mutate();
                form.reset();
                toast({
                    variant: "success",
                    title: "Success",
                    description: "Message deleted successfully.",
                });
            } else {
                mutate();
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to delete message.",
                });
            }
        } catch (error) {
            mutate();
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete message.",
            });
        }
        setIsDeleting(false);
    }

    const onClickArchive = async (event: React.MouseEvent) => {
        event.preventDefault()
        const messageIds = form.getValues().ids;
        setIsArchiving(true);
        try {
            // Optimistic update for archiving a message
            messageIds.forEach((messageId: string) => {
                mutate(getOptimisticUpdate(messageId, () => undefined), false);
            });
            const response = await fetch('/api/archive-message', {
                method: 'PUT',
                body: JSON.stringify(form.getValues()),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                mutate();
                form.reset();
                toast({
                    variant: "archived",
                    title: "Success",
                    description: "Message archived successfully.",
                });
            } else {
                mutate();
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to archive message.",
                });
            }
        } catch (error) {
            mutate();
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to archive message.",
            });
        }
        setIsArchiving(false);
    }

    const allCustomersMessages: Customer[] = data?.messageData;



    if (isLoading) {
        return <InboxSkeleton />
    }
    if (error) {
        return <div>Failed to load</div>
    }

    if (allCustomersMessages?.every((customer) => customer.message === null) || allCustomersMessages?.every(customer => customer.message?.isArchive)) {

        return <div className="text-gray-400 p-4 text-center">No Messages</div>;
    }




    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="w-full max-w-3xl mx-auto py-6 px-4 md:px-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                <Button variant="outline">
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin inline-block mr-2" />
                                            Marking...
                                        </>
                                    ) : (
                                        <>
                                            <FaCheck className="w-4 h-4 mr-1" type="submit" />
                                            Mark as read
                                        </>
                                    )}
                                </Button>
                                <Button variant="destructive" onClick={onClickDelete}>
                                    {isDeleting ? (
                                        <>
                                            <FaSpinner className="animate-spin inline-block mr-2" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <FaRegTrashCan className="w-4 h-4 mr-1" />
                                            Delete
                                        </>
                                    )}
                                </Button>
                                <Button variant="archive" onClick={onClickArchive}>
                                    {isArchiving ? (
                                        <>
                                            <FaSpinner className="animate-spin inline-block mr-2" />
                                            Archiving...
                                        </>
                                    ) : (
                                        <>
                                            <FaBoxArchive className="w-4 h-4 mr-1" />
                                            Archive
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-4">

                            {allCustomersMessages?.map((customer) => (
                                customer.message !== null && !customer.message.isArchive && (
                                    <div key={customer.id} className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-100">
                                        <CheckboxForm control={form.control} name="ids" contactId={customer.message.id} key={customer.message.id} />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div className="font-semibold">{customer.name}</div>
                                                <div className="text-sm text-gray-500">{formatDate(customer.message.createdAt)}</div>
                                            </div>
                                            <div className="text-sm font-medium">{customer.email}</div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-gray-500 line-clamp-1 mr-4">
                                                    {customer.message.content}
                                                </p>
                                                <div className="flex items-center">
                                                    <MessageFull nameFull={customer.name} date={formatDate(customer.message?.createdAt)}
                                                        message={customer.message?.content} phone={customer.phone} onView={() => handleViewMessage(customer.message.id, customer.message.isNew)} />
                                                    {customer.message.isNew && <RxDotFilled className="text-blue-500 w-7 h-7" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </form>
            </Form>
        </>
    )
}

