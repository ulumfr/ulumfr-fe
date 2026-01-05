"use client";

import { toast } from "sonner";
import { Pencil, Trash2, Tags } from "lucide-react";
import type { Tag, CreateTagInput, UpdateTagInput } from "@/types/tag";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TagFormDialog } from "./tag-form-dialog";

interface TagListProps {
    tags: Tag[];
    isLoading: boolean;
    onUpdate: (id: string, data: UpdateTagInput) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export function TagList({
    tags,
    isLoading,
    onUpdate,
    onDelete,
}: TagListProps) {
    const handleDelete = async (tag: Tag) => {
        try {
            await onDelete(tag.id);
            toast.success("Tag deleted", {
                description: `${tag.name} has been deleted.`,
            });
        } catch {
            toast.error("Failed to delete tag");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading tags...</div>
            </div>
        );
    }

    if (tags.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <Tags className="size-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">No tags yet</h3>
                <p className="text-muted-foreground text-sm mb-4">
                    Create your first tag to label projects.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                    <div
                        key={tag.id}
                        className="flex items-center gap-2 p-3 rounded-lg border bg-card group"
                    >
                        <Badge variant="secondary" className="text-sm">
                            {tag.name}
                        </Badge>
                        <span className="text-xs text-muted-foreground">/{tag.slug}</span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <TagFormDialog
                                tag={tag}
                                onSubmit={(data) => onUpdate(tag.id, data)}
                                trigger={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="size-6 cursor-pointer"
                                    >
                                        <Pencil className="size-3" />
                                    </Button>
                                }
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-6 cursor-pointer text-destructive hover:text-destructive"
                                onClick={() => handleDelete(tag)}
                            >
                                <Trash2 className="size-3" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
