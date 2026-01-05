"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Eye, Mail, MailOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Contact } from "@/types/contact";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ContactDetailDialog } from "./contact-detail-dialog";

interface ContactListProps {
    contacts: Contact[];
    isLoading: boolean;
    onMarkAsRead: (id: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export function ContactList({
    contacts,
    isLoading,
    onMarkAsRead,
    onDelete,
}: ContactListProps) {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);

    const handleView = async (contact: Contact) => {
        setSelectedContact(contact);
        setDetailOpen(true);
        if (!contact.is_read) {
            await onMarkAsRead(contact.id);
        }
    };

    const handleDelete = async (contact: Contact) => {
        try {
            await onDelete(contact.id);
            toast.success("Contact deleted", {
                description: `Message from ${contact.name} has been deleted.`,
            });
        } catch {
            toast.error("Failed to delete contact", {
                description: "Please try again later.",
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading contacts...</div>
            </div>
        );
    }

    if (contacts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <Mail className="size-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">No contacts yet</h3>
                <p className="text-muted-foreground text-sm">
                    Messages from your contact form will appear here.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12"></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow
                                key={contact.id}
                                className={contact.is_read ? "opacity-60" : ""}
                            >
                                <TableCell>
                                    {contact.is_read ? (
                                        <MailOpen className="size-4 text-muted-foreground" />
                                    ) : (
                                        <Badge variant="default" className="size-2 p-0 rounded-full" />
                                    )}
                                </TableCell>
                                <TableCell className="font-medium">{contact.name}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell className="max-w-48 truncate">
                                    {contact.subject || "-"}
                                </TableCell>
                                <TableCell>
                                    {format(new Date(contact.created_at), "MMM d, yyyy")}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="cursor-pointer"
                                            onClick={() => handleView(contact)}
                                        >
                                            <Eye className="size-4" />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon" className="cursor-pointer">
                                                    <Trash2 className="size-4 text-destructive" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to delete this message from{" "}
                                                        <strong>{contact.name}</strong>?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDelete(contact)}
                                                        className="cursor-pointer bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <ContactDetailDialog
                contact={selectedContact}
                open={detailOpen}
                onOpenChange={setDetailOpen}
            />
        </>
    );
}
