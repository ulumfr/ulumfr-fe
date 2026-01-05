"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type { Tag, CreateTagInput } from "@/types/tag";

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

interface TagFormDialogProps {
    tag?: Tag | null;
    onSubmit: (data: CreateTagInput) => Promise<void>;
    trigger?: React.ReactNode;
}

export function TagFormDialog({ tag, onSubmit, trigger }: TagFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");

    const isEdit = !!tag;

    useEffect(() => {
        if (tag) {
            setName(tag.name);
            setSlug(tag.slug);
        } else {
            setName("");
            setSlug("");
        }
    }, [tag, open]);

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleNameChange = (value: string) => {
        setName(value);
        if (!isEdit) {
            setSlug(generateSlug(value));
        }
    };

    const handleSubmit = async () => {
        if (!name.trim() || !slug.trim()) {
            toast.error("Name and slug are required");
            return;
        }

        setIsLoading(true);
        try {
            await onSubmit({
                name: name.trim(),
                slug: slug.trim(),
            });
            toast.success(isEdit ? "Tag updated" : "Tag created", {
                description: `${name} has been ${isEdit ? "updated" : "created"}.`,
            });
            setOpen(false);
        } catch {
            toast.error(`Failed to ${isEdit ? "update" : "create"} tag`);
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
                        Add Tag
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Tag" : "Add Tag"}</DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Update the tag details."
                            : "Create a new tag to label your projects."}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g., React"
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            placeholder="e.g., react"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
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
