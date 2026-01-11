"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type { Certificate, CreateCertificateInput } from "@/types/certificate";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { ImageUpload } from "@/components/ui/image-upload";

interface CertificateFormDialogProps {
    certificate?: Certificate | null;
    onSubmit: (data: CreateCertificateInput) => Promise<any>;
    trigger?: React.ReactNode;
}

export function CertificateFormDialog({ certificate, onSubmit, trigger }: CertificateFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [issuer, setIssuer] = useState("");
    const [issueDate, setIssueDate] = useState<Date | undefined>(undefined);
    const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
    const [credentialId, setCredentialId] = useState("");
    const [credentialUrl, setCredentialUrl] = useState("");
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState("");

    const isEdit = !!certificate;

    useEffect(() => {
        if (certificate) {
            setName(certificate.name);
            setIssuer(certificate.issuer);
            setIssueDate(certificate.issue_date ? new Date(certificate.issue_date) : undefined);
            setExpiryDate(certificate.expiry_date ? new Date(certificate.expiry_date) : undefined);
            setCredentialId(certificate.credential_id || "");
            setCredentialUrl(certificate.credential_url || "");
            setImageUrl(certificate.image_url || undefined);
            setDescription(certificate.description || "");
        } else {
            setName("");
            setIssuer("");
            setIssueDate(undefined);
            setExpiryDate(undefined);
            setCredentialId("");
            setCredentialUrl("");
            setImageUrl(undefined);
            setDescription("");
        }
    }, [certificate, open]);

    const handleSubmit = async () => {
        if (!name.trim() || !issuer.trim() || !issueDate) {
            toast.error("Name, issuer, and issue date are required");
            return;
        }

        setIsLoading(true);
        try {
            await onSubmit({
                name: name.trim(),
                issuer: issuer.trim(),
                issue_date: issueDate.toISOString(),
                expiry_date: expiryDate ? expiryDate.toISOString() : undefined,
                credential_id: credentialId.trim() || undefined,
                credential_url: credentialUrl.trim() || undefined,
                image_url: imageUrl || undefined,
                description: description.trim() || undefined,
            });
            toast.success(isEdit ? "Certificate updated" : "Certificate added", {
                description: `"${name}" has been ${isEdit ? "updated" : "added"}.`,
            });
            setOpen(false);
        } catch {
            toast.error(`Failed to ${isEdit ? "update" : "add"} certificate`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="cursor-pointer">
                        <Plus className="size-4 mr-2" />
                        Add Certificate
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Certificate" : "Add Certificate"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Update certificate details." : "Add a new certificate."}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-2">
                        <Label>Certificate Image</Label>
                        <ImageUpload
                            value={imageUrl}
                            onChange={setImageUrl}
                            folder="certificates"
                            placeholder="Upload certificate image"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Certificate Name *</Label>
                        <Input
                            id="name"
                            placeholder="e.g., AWS Solutions Architect"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="issuer">Issuer *</Label>
                        <Input
                            id="issuer"
                            placeholder="e.g., Amazon Web Services"
                            value={issuer}
                            onChange={(e) => setIssuer(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Issue Date *</Label>
                            <DatePicker
                                date={issueDate}
                                onDateChange={setIssueDate}
                                placeholder="Select issue date"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Expiry Date</Label>
                            <DatePicker
                                date={expiryDate}
                                onDateChange={setExpiryDate}
                                placeholder="Select expiry date"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="credentialId">Credential ID</Label>
                            <Input
                                id="credentialId"
                                placeholder="e.g., ABC123XYZ"
                                value={credentialId}
                                onChange={(e) => setCredentialId(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="credentialUrl">Credential URL</Label>
                            <Input
                                id="credentialUrl"
                                type="url"
                                placeholder="https://..."
                                value={credentialUrl}
                                onChange={(e) => setCredentialUrl(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Brief description of the certificate..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="cursor-pointer"
                    >
                        {isLoading ? "Saving..." : isEdit ? "Update" : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
