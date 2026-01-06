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
    onSubmit: (data: CreateTagInput) => Promise<any>;
    trigger?: React.ReactNode;
}

export function TagFormDialog({ tag, onSubmit, trigger }: TagFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [iconUrl, setIconUrl] = useState("");

    const isEdit = !!tag;

    useEffect(() => {
        if (tag) {
            setName(tag.name);
            setSlug(tag.slug);
            setIconUrl(tag.icon_url || "");
        } else {
            setName("");
            setSlug("");
            setIconUrl("");
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
                icon_url: iconUrl.trim() || undefined,
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
                    <div className="space-y-2">
                        <Label htmlFor="iconUrl">Devicon Class</Label>
                        <div className="flex gap-3 items-center">
                            <Input
                                id="iconUrl"
                                placeholder="e.g., devicon-react-original"
                                value={iconUrl}
                                onChange={(e) => setIconUrl(e.target.value)}
                                className="flex-1"
                            />
                            {iconUrl && (
                                <div className="flex items-center justify-center w-10 h-10 border rounded-md bg-muted">
                                    <i className={`${iconUrl} text-2xl`}></i>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Browse icons at{" "}
                            <a
                                href="https://devicon.dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline"
                            >
                                devicon.dev
                            </a>
                        </p>
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
