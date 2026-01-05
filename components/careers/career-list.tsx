"use client";

import { format } from "date-fns";
import { toast } from "sonner";
import { Pencil, Trash2, Briefcase, MapPin, Calendar, ExternalLink } from "lucide-react";
import type { Career, CreateCareerInput, UpdateCareerInput } from "@/types/career";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CareerFormDialog } from "./career-form-dialog";

interface CareerListProps {
    careers: Career[];
    isLoading: boolean;
    onCreate: (data: CreateCareerInput) => Promise<void>;
    onUpdate: (id: string, data: UpdateCareerInput) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export function CareerList({
    careers,
    isLoading,
    onCreate,
    onUpdate,
    onDelete,
}: CareerListProps) {
    const handleDelete = async (career: Career) => {
        try {
            await onDelete(career.id);
            toast.success("Experience deleted", {
                description: `${career.position} at ${career.company} has been deleted.`,
            });
        } catch {
            toast.error("Failed to delete experience");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading experiences...</div>
            </div>
        );
    }

    if (careers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <Briefcase className="size-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">No work experience yet</h3>
                <p className="text-muted-foreground text-sm mb-4">
                    Add your first work experience.
                </p>
            </div>
        );
    }

    const formatDateRange = (career: Career) => {
        const start = format(new Date(career.start_date), "MMM yyyy");
        if (career.is_current) return `${start} - Present`;
        if (career.end_date) {
            const end = format(new Date(career.end_date), "MMM yyyy");
            return `${start} - ${end}`;
        }
        return start;
    };

    return (
        <div className="grid gap-4">
            {careers.map((career) => (
                <Card key={career.id}>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-muted p-2">
                                <Briefcase className="size-5 text-muted-foreground" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-base">{career.position}</CardTitle>
                                    {career.is_current && (
                                        <Badge variant="default" className="text-xs">
                                            Current
                                        </Badge>
                                    )}
                                </div>
                                <CardDescription className="flex items-center gap-1">
                                    {career.company}
                                    {career.company_url && (
                                        <a
                                            href={career.company_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            <ExternalLink className="size-3" />
                                        </a>
                                    )}
                                </CardDescription>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <CareerFormDialog
                                career={career}
                                onSubmit={(data) => onUpdate(career.id, data)}
                                trigger={
                                    <Button variant="ghost" size="icon" className="cursor-pointer">
                                        <Pencil className="size-4" />
                                    </Button>
                                }
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer text-destructive hover:text-destructive"
                                onClick={() => handleDelete(career)}
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {career.location && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="size-3" />
                                    {career.location}
                                </span>
                            )}
                            <span className="flex items-center gap-1">
                                <Calendar className="size-3" />
                                {formatDateRange(career)}
                            </span>
                        </div>
                        {career.description && (
                            <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">
                                {career.description}
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
