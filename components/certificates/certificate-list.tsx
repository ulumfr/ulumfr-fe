"use client";

import { toast } from "sonner";
import { Pencil, Trash2, Award, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import type { Certificate, CreateCertificateInput, UpdateCertificateInput } from "@/types/certificate";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CertificateFormDialog } from "./certificate-form-dialog";

interface CertificateListProps {
    certificates: Certificate[];
    isLoading: boolean;
    onCreate: (data: CreateCertificateInput) => Promise<any>;
    onUpdate: (id: string, data: UpdateCertificateInput) => Promise<any>;
    onDelete: (id: string) => Promise<any>;
}

export function CertificateList({
    certificates,
    isLoading,
    onCreate,
    onUpdate,
    onDelete,
}: CertificateListProps) {
    const handleDelete = async (certificate: Certificate) => {
        try {
            await onDelete(certificate.id);
            toast.success("Certificate deleted", {
                description: `"${certificate.name}" has been deleted.`,
            });
        } catch {
            toast.error("Failed to delete certificate");
        }
    };

    const isExpired = (expiryDate?: string) => {
        if (!expiryDate) return false;
        return new Date(expiryDate) < new Date();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading certificates...</div>
            </div>
        );
    }

    if (certificates.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <Award className="size-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">No certificates yet</h3>
                <p className="text-muted-foreground text-sm mb-4">
                    Add your first certificate.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
                <Card key={certificate.id} className="overflow-hidden flex flex-col">
                    {certificate.image_url && (
                        <div className="relative h-40 w-full bg-muted">
                            <Image
                                src={certificate.image_url}
                                alt={certificate.name}
                                fill
                                className="object-contain p-2"
                            />
                        </div>
                    )}
                    <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <CardTitle className="text-base line-clamp-2">{certificate.name}</CardTitle>
                                <CardDescription className="mt-1">
                                    {certificate.issuer}
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                <CertificateFormDialog
                                    certificate={certificate}
                                    onSubmit={(data) => onUpdate(certificate.id, data)}
                                    trigger={
                                        <Button variant="ghost" size="icon" className="cursor-pointer size-8">
                                            <Pencil className="size-3" />
                                        </Button>
                                    }
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="cursor-pointer size-8 text-destructive hover:text-destructive"
                                    onClick={() => handleDelete(certificate)}
                                >
                                    <Trash2 className="size-3" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            {certificate.expiry_date ? (
                                isExpired(certificate.expiry_date) ? (
                                    <Badge variant="destructive" className="text-xs">
                                        Expired
                                    </Badge>
                                ) : (
                                    <Badge variant="default" className="text-xs">
                                        Valid
                                    </Badge>
                                )
                            ) : (
                                <Badge variant="secondary" className="text-xs">
                                    No Expiry
                                </Badge>
                            )}
                        </div>
                        {certificate.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2 flex-1">
                                {certificate.description}
                            </p>
                        )}
                        <div className="space-y-1 text-xs text-muted-foreground mt-auto">
                            <div className="flex items-center gap-2">
                                <Calendar className="size-3" />
                                <span>
                                    Issued: {format(new Date(certificate.issue_date), "MMM d, yyyy")}
                                </span>
                            </div>
                            {certificate.expiry_date && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="size-3" />
                                    <span>
                                        Expires: {format(new Date(certificate.expiry_date), "MMM d, yyyy")}
                                    </span>
                                </div>
                            )}
                            {certificate.credential_url && (
                                <a
                                    href={certificate.credential_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-primary hover:underline"
                                >
                                    <ExternalLink className="size-3" />
                                    View Credential
                                </a>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
