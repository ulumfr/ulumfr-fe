"use client";

import { format } from "date-fns";
import type { Contact } from "@/types/contact";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ContactDetailDialogProps {
    contact: Contact | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ContactDetailDialog({
    contact,
    open,
    onOpenChange,
}: ContactDetailDialogProps) {
    if (!contact) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <DialogTitle>{contact.subject || "No Subject"}</DialogTitle>
                        {!contact.is_read && <Badge variant="default">New</Badge>}
                    </div>
                    <DialogDescription>
                        From {contact.name} ({contact.email})
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Name</p>
                            <p className="font-medium">{contact.name}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="font-medium">{contact.email}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-muted-foreground">Date</p>
                            <p className="font-medium">
                                {format(new Date(contact.created_at), "MMMM d, yyyy 'at' h:mm a")}
                            </p>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <p className="text-muted-foreground text-sm mb-2">Message</p>
                        <div className="rounded-lg bg-muted/50 p-4 text-sm whitespace-pre-wrap">
                            {contact.message}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
