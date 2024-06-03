"use client";

import { Button } from "@/components/ui/button";
import { FaRegTrashCan, FaSpinner } from "react-icons/fa6";
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
import AlertConfirm from "../CustomUi/AlertConfirm";
import getOptimisticUpdate from "@/lib/mutate";

export default function ArchiveList() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [alertDescription, setAlertDescription] = useState("");
    const [errorAlert, setErrorAlert] = useState("");

    const { data, isLoading, error, mutate } = useSWR("/api/get-all-messages", fetcher);

    const form = useForm({
        defaultValues: {
            ids: [],
        },
    });

    const onClickDelete = async (event: React.MouseEvent) => {
        event.preventDefault();
        const messageIds = form.getValues().ids;
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
            } else {
                setIsOpen(true);
                setErrorAlert("Failed to delete message");
                setAlertDescription("Error deleting message. Click OK to continue");
            }
        } catch (error) {
            setIsOpen(true);
            setErrorAlert("Failed to delete message");
            setAlertDescription("Error deleting message. Click OK to continue");
            console.error("Error:", error);
        }
        setIsDeleting(false);
    };

    const allCustomersMessages: Customer[] = data?.messageData;

    if (isLoading) {
        return <InboxSkeleton />;
    }
    if (error) {
        return <div>Failed to load</div>;
    }

    if (
        allCustomersMessages?.every((customer) => customer.Message === null) ||
        allCustomersMessages?.every((customer) => !customer.Message?.isArchive)
    ) {
        return <div className="text-gray-400 p-4 text-center">No Archived Messages</div>;
    }

    return (
        <>
            <Form {...form}>
                <form>
                    <div className="w-full max-w-3xl mx-auto py-6 px-4 md:px-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
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
                            </div>
                        </div>
                        <div className="space-y-4">
                            {allCustomersMessages?.map(
                                (customer) =>
                                    customer.Message !== null &&
                                    customer.Message.isArchive && (
                                        <div
                                            key={customer.id}
                                            className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-100"
                                        >
                                            <CheckboxForm
                                                control={form.control}
                                                name="ids"
                                                contactId={customer.Message.id}
                                                key={customer.Message.id}
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div className="font-semibold">{customer.name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {formatDate(customer.Message.createdAt)}
                                                    </div>
                                                </div>
                                                <div className="text-sm font-medium">{customer.email}</div>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-sm text-gray-500 line-clamp-1 mr-4">
                                                        {customer.Message.content}
                                                    </p>
                                                    <div className="flex items-center">
                                                        <MessageFull
                                                            nameFull={customer.name}
                                                            date={formatDate(customer.Message?.createdAt)}
                                                            message={customer.Message?.content}
                                                            phone={customer.phone}
                                                        />
                                                        {customer.Message.isNew && (
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