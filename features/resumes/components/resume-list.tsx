"use client";

import { FileText } from "lucide-react";
import type { Resume } from "@/types/resume";
import { ResumeCard } from "./resume-card";

interface ResumeListProps {
    resumes: Resume[];
    isLoading: boolean;
    onActivate: (id: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export function ResumeList({
    resumes,
    isLoading,
    onActivate,
    onDelete,
}: ResumeListProps) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading resumes...</div>
            </div>
        );
    }

    if (resumes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="size-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">No resumes yet</h3>
                <p className="text-muted-foreground text-sm">
                    Upload your first resume to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
                <ResumeCard
                    key={resume.id}
                    resume={resume}
                    onActivate={onActivate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
