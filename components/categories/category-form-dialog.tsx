"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type { Category, CreateCategoryInput } from "@/types/category";

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

interface CategoryFormDialogProps {
    category?: Category | null;
    onSubmit: (data: CreateCategoryInput) => Promise<any>;
    trigger?: React.ReactNode;
}

export function CategoryFormDialog({
    category,
    onSubmit,
    trigger,
}: CategoryFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");

    const isEdit = !!category;

    useEffect(() => {
        if (category) {
            setName(category.name);
            setSlug(category.slug);
            setDescription(category.description || "");
        } else {
            setName("");
            setSlug("");
            setDescription("");
        }
    }, [category, open]);

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
                description: description.trim() || undefined,
            });
            toast.success(isEdit ? "Category updated" : "Category created", {
                description: `${name} has been ${isEdit ? "updated" : "created"}.`,
            });
            setOpen(false);
        } catch {
            toast.error(`Failed to ${isEdit ? "update" : "create"} category`);
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
                        Add Category
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Update the category details."
                            : "Create a new category for your projects."}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g., Web Development"
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            placeholder="e.g., web-development"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description (optional)</Label>
                        <Textarea
                            id="description"
                            placeholder="Brief description of this category..."
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
