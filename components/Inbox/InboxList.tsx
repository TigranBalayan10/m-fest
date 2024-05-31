"use client";

import { Button } from "@/components/ui/button"
import { FaCheck, FaRegTrashCan, FaBoxArchive, FaCircleDot, FaSpinner } from "react-icons/fa6";
import { RxDotFilled } from "react-icons/rx";
import MessageFull from "./MessageFull";
import { fetcher } from "@/lib/swrFetcher";
import { Customer, Message } from "@/lib/Types/ContactUsTypes";
import { formatDate } from "@/lib/FormatDate";
import useSWR from "swr";
import InboxSkeleton from "./InboxSkeleton";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { set, z } from "zod"
import { MarkedReadSchema } from "@/lib/zodSchema";
import { Form } from "../ui/form";
import CheckboxForm from "../CustomUi/CheckboxForm";
import AlertConfirm from "../CustomUi/AlertConfirm";
import useSWRMutation from 'swr/mutation'


export default function InboxList() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isArchiving, setIsArchiving] = useState(false);
    const [confirm, setConfirm] = useState("");
    const [alertDescription, setAlertDescription] = useState("");
    const [errorAlert, setErrorAlert] = useState("");

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
                mutate();
                form.reset();
            } else {
                setIsOpen(true);
                setErrorAlert('Failed to mark message as viewed');
                setAlertDescription("Message has been marked as read. Click OK to continue");
            }
        } catch (error) {
            setIsOpen(true);
            setErrorAlert('Failed to mark message as viewed');
            setAlertDescription("Message has been marked as read. Click OK to continue");
            console.error('Error:', error);
        }
    }

    const handleViewMessage = async (messageId: string, isNew: boolean) => {
        if (isNew === false) {
            console.log('Message is already marked as read. No action needed.');
            return;
        }
        try {
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
                mutate();
                console.log('Message marked as viewed');
            } else {
                console.log('Failed to mark message as viewed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onClickDelete = async (event: React.MouseEvent) => {
        event.preventDefault()
        setIsDeleting(true);
        try {
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
            } else {
                setIsOpen(true);
                setErrorAlert("Failed to delete message");
                setAlertDescription("Error deleting message. Click OK to continue");
            }
        } catch (error) {
            setIsOpen(true);
            setErrorAlert("Failed to delete message");
            setAlertDescription("Error deleting message. Click OK to continue");
            console.error('Error:', error);
        }
        setIsDeleting(false);
    }

    const onClickArchive = async (event: React.MouseEvent) => {
        event.preventDefault()
        setIsArchiving(true);
        try {
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
            } else {
                setIsOpen(true);
                setErrorAlert("Failed to archive message");
                setAlertDescription("Error archiving message. Click OK to continue");
            }
        } catch (error) {
            setIsOpen(true);
            setErrorAlert("Failed to archive message");
            setAlertDescription("Error archiving message. Click OK to continue");
            console.error('Error:', error);
        }
        setIsArchiving(false);
    }

    const allCustomersMessages: Customer[] = data?.messageData;
    console.log(allCustomersMessages, "allMessages")


    if (isLoading) {
        return <InboxSkeleton />
    }
    if (error) {
        return <div>Failed to load</div>
    }

    if (allCustomersMessages.every((customer) => customer.Message === null) || allCustomersMessages.every(customer => customer.Message?.isArchive)) {

        return <div className="text-gray-400 p-4 text-center">No Messages</div>;
    }




    return (
        <>
            {isOpen && <AlertConfirm title={confirm} description={alertDescription} />}
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
                                !customer.Message?.isArchive && (
                                    <div key={customer.id} className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-100">
                                        <CheckboxForm control={form.control} name="ids" contactId={customer.Message.id} key={customer.Message.id} />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div className="font-semibold">{customer.name}</div>
                                                <div className="text-sm text-gray-500">{formatDate(customer.Message.createdAt)}</div>
                                            </div>
                                            <div className="text-sm font-medium">{customer.email}</div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-gray-500 line-clamp-1 mr-4">
                                                    {customer.Message.content}
                                                </p>
                                                <div className="flex items-center">
                                                    <MessageFull nameFull={customer.name} date={formatDate(customer.Message?.createdAt)}
                                                        message={customer.Message?.content} phone={customer.phone} onView={() => handleViewMessage(customer.Message.id, customer.Message.isNew)} />
                                                    {customer.Message.isNew && <RxDotFilled className="text-blue-500 w-7 h-7" />}
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

