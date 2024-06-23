"use client";

import { Button } from "@/components/ui/button";
import { FaRegTrashCan, FaSpinner, FaBoxOpen } from "react-icons/fa6";
import { RxDotFilled } from "react-icons/rx";
import MessageFull from "./MessageFull";
import { fetcher } from "@/lib/swrFetcher";
import { Customer } from "@/lib/Types/ContactUsTypes";
import { formatDate } from "@/lib/FormatDate";
import useSWR from "swr";
import InboxSkeleton from "./InboxSkeleton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Form } from "../ui/form";
import CheckboxForm from "../CustomUi/CheckboxForm";
import getOptimisticUpdate from "@/lib/mutate";
import { useToast } from "@/components/ui/use-toast";

export default function ArchiveList() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUnarchive, setIsUnarchive] = useState(false);
    const { toast } = useToast();

    const { data, isLoading, error, mutate } = useSWR("/api/get-all-messages", fetcher);

    const form = useForm({
        defaultValues: {
            ids: [],
        },
    });
    const messageIds = form.getValues().ids;

    const onClickDelete = async (event: React.MouseEvent) => {
        event.preventDefault();
        setIsDeleting(true);
        try {
            // Optimistic update for deleting a message
            messageIds.forEach((messageId: string) => {
                mutate(getOptimisticUpdate(messageId, () => undefined), false);
            });
            const response = await fetch("/api/delete-message", {
                method: "DELETE",
                body: JSON.stringify(form.getValues()),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                mutate();
                form.reset();
                toast({
                    variant: "success",
                    title: "Success",
                    description: "Message deleted successfully",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to delete message",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete message",
            });
        }
        setIsDeleting(false);
    };

    const onClickUnarchive = async (event: React.MouseEvent) => {
        event.preventDefault();
        setIsUnarchive(true);
        try {
            // Optimistic update for deleting a message
            messageIds.forEach((messageId: string) => {
                mutate(getOptimisticUpdate(messageId, () => undefined), false);
            });
            const response = await fetch("/api/unarchive-message", {
                method: "PUT",
                body: JSON.stringify(form.getValues()),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                mutate();
                form.reset();
                toast({
                    variant: "success",
                    title: "Success",
                    description: "Message restored successfully. Check the inbox for the message",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to restore message",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to restore message",
            });
        }
        setIsUnarchive(false);
    };

    const allCustomersMessages: Customer[] = data?.messageData;

    if (isLoading) {
        return <InboxSkeleton />;
    }
    if (error) {
        return <div>Failed to load</div>;
    }

    if (
        allCustomersMessages?.every((customer) => customer.message === null) ||
        allCustomersMessages?.every((customer) => !customer.message?.isArchive)
    ) {
        return <div className="text-gray-400 p-4 text-center">No Archived Messages</div>;
    }

    return (
        <>
            <Form {...form}>
                <form>
                    <div className="w-full max-w-3xl mx-auto py-6 px-4 md:px-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-1">
                                <Button variant="destructive" onClick={onClickDelete} disabled={messageIds.length === 0}>
                                    {isDeleting ? (
                                        <>
                                            <FaSpinner className="animate-spin inline-block" />
                                        </>
                                    ) : (
                                        <>
                                            <FaRegTrashCan className="w-4 h-4 " />
                                        </>
                                    )}
                                </Button>
                                <Button variant="unArchive" onClick={onClickUnarchive} disabled={messageIds.length === 0}>
                                    {isUnarchive ? (
                                        <>
                                            <FaSpinner className="animate-spin inline-block" />
                                        </>
                                    ) : (
                                        <>
                                            <FaBoxOpen className="w-4 h-4 " />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {allCustomersMessages?.map(
                                (customer) =>
                                    customer.message !== null &&
                                    customer.message.isArchive && (
                                        <div
                                            key={customer.id}
                                            className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-100"
                                        >
                                            <CheckboxForm
                                                control={form.control}
                                                name="ids"
                                                contactId={customer.message.id}
                                                key={customer.message.id}
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div className="font-semibold">{customer.name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {formatDate(customer.message.createdAt)}
                                                    </div>
                                                </div>
                                                <div className="text-sm font-medium">{customer.email}</div>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-sm text-gray-500 line-clamp-1 mr-4">
                                                        {customer.message.content}
                                                    </p>
                                                    <div className="flex items-center">
                                                        <MessageFull
                                                            nameFull={customer.name}
                                                            date={formatDate(customer.message?.createdAt)}
                                                            message={customer.message?.content}
                                                            phone={customer.phone}
                                                        />
                                                        {customer.message.isNew && (
                                                            <RxDotFilled className="text-blue-500 w-7 h-7" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                </form>
            </Form>
        </>
    );
}