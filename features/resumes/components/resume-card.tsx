"use client";

import { format } from "date-fns";
import { toast } from "sonner";
import {
    ExternalLink,
    FileText,
    MoreHorizontal,
    Star,
    Trash2,
} from "lucide-react";
import type { Resume } from "@/types/resume";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

interface ResumeCardProps {
    resume: Resume;
    onActivate: (id: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ResumeCard({ resume, onActivate, onDelete }: ResumeCardProps) {
    const handleActivate = async () => {
        try {
            await onActivate(resume.id);
            toast.success("Resume activated", {
                description: `${resume.file_name} is now your active resume.`,
            });
        } catch {
            toast.error("Failed to activate resume", {
                description: "Please try again later.",
            });
        }
    };

    const handleDelete = async () => {
        try {
            await onDelete(resume.id);
            toast.success("Resume deleted", {
                description: `${resume.file_name} has been deleted.`,
            });
        } catch {
            toast.error("Failed to delete resume", {
                description: "Please try again later.",
            });
        }
    };

    return (
        <Card className={resume.is_active ? "border-primary" : ""}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-muted p-2">
                        <FileText className="size-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-base">{resume.file_name}</CardTitle>
                            {resume.is_active && (
                                <Badge variant="default" className="text-xs">
                                    <Star className="size-3 mr-1" />
                                    Active
                                </Badge>
                            )}
                        </div>
                        <CardDescription className="text-xs">
                            {resume.version && `v${resume.version} • `}
                            {formatFileSize(resume.file_size)} •{" "}
                            {format(new Date(resume.created_at), "MMM d, yyyy")}
                        </CardDescription>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
                            <MoreHorizontal className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <a href={resume.file_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="size-4 mr-2" />
                                Open File
                            </a>
                        </DropdownMenuItem>
                        {!resume.is_active && (
                            <DropdownMenuItem onClick={handleActivate} className="cursor-pointer">
                                <Star className="size-4 mr-2" />
                                Set as Active
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                    className="cursor-pointer text-destructive focus:text-destructive"
                                >
                                    <Trash2 className="size-4 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Resume</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to delete &quot;{resume.file_name}&quot;?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDelete}
                                        className="cursor-pointer bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
        </Card>
    );
}
