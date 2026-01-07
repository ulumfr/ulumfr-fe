"use client";

import { format } from "date-fns";
import { toast } from "sonner";
import { Pencil, Trash2, GraduationCap, MapPin, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { Education, CreateEducationInput, UpdateEducationInput } from "@/types/education";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EducationFormDialog } from "./education-form-dialog";

interface EducationListProps {
    educations: Education[];
    isLoading: boolean;
    onCreate: (data: CreateEducationInput) => Promise<any>;
    onUpdate: (id: string, data: UpdateEducationInput) => Promise<any>;
    onDelete: (id: string) => Promise<any>;
}

export function EducationList({
    educations,
    isLoading,
    onCreate,
    onUpdate,
    onDelete,
}: EducationListProps) {
    const handleDelete = async (education: Education) => {
        try {
            await onDelete(education.id);
            toast.success("Education deleted", {
                description: `${education.degree} at ${education.school} has been deleted.`,
            });
        } catch {
            toast.error("Failed to delete education");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading education...</div>
            </div>
        );
    }

    if (educations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <GraduationCap className="size-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">No education yet</h3>
                <p className="text-muted-foreground text-sm mb-4">
                    Add your first education entry.
                </p>
            </div>
        );
    }

    const formatDateRange = (education: Education) => {
        const start = format(new Date(education.start_date), "yyyy");
        if (education.end_date) {
            const end = format(new Date(education.end_date), "yyyy");
            return `${start} - ${end}`;
        }
        return `${start} - Present`;
    };

    return (
        <div className="grid gap-4">
            {educations.map((education) => (
                <Card key={education.id}>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-muted p-2 overflow-hidden">
                                {education.logo_url ? (
                                    <Image
                                        src={education.logo_url}
                                        alt={`${education.school} logo`}
                                        width={20}
                                        height={20}
                                        className="size-5 object-contain"
                                    />
                                ) : (
                                    <GraduationCap className="size-5 text-muted-foreground" />
                                )}
                            </div>
                            <div>
                                <CardTitle className="text-base">
                                    {education.degree}
                                    {education.field && ` in ${education.field}`}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                    {education.school}
                                    {education.school_url && (
                                        <a
                                            href={education.school_url}
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
                            <EducationFormDialog
                                education={education}
                                onSubmit={(data) => onUpdate(education.id, data)}
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
                                onClick={() => handleDelete(education)}
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {education.location && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="size-3" />
                                    {education.location}
                                </span>
                            )}
                            <span className="flex items-center gap-1">
                                <Calendar className="size-3" />
                                {formatDateRange(education)}
                            </span>
                            {education.gpa && (
                                <span>GPA: {education.gpa}</span>
                            )}
                        </div>
                        {education.description && (
                            <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">
                                {education.description}
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
