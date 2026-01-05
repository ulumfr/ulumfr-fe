"use client";

import { toast } from "sonner";
import { Pencil, Trash2, Layers } from "lucide-react";
import type { Category, CreateCategoryInput, UpdateCategoryInput } from "@/types/category";

import { Button } from "@/components/ui/button";
import { CategoryFormDialog } from "./category-form-dialog";

interface CategoryListProps {
    categories: Category[];
    isLoading: boolean;
    onUpdate: (id: string, data: UpdateCategoryInput) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export function CategoryList({
    categories,
    isLoading,
    onUpdate,
    onDelete,
}: CategoryListProps) {
    const handleDelete = async (category: Category) => {
        try {
            await onDelete(category.id);
            toast.success("Category deleted", {
                description: `${category.name} has been deleted.`,
            });
        } catch {
            toast.error("Failed to delete category");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading categories...</div>
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <Layers className="size-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">No categories yet</h3>
                <p className="text-muted-foreground text-sm mb-4">
                    Create your first category to organize projects.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-3">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-muted p-2">
                                <Layers className="size-5 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-medium">{category.name}</p>
                                <p className="text-sm text-muted-foreground">/{category.slug}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <CategoryFormDialog
                                category={category}
                                onSubmit={(data) => onUpdate(category.id, data)}
                                trigger={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="cursor-pointer"
                                    >
                                        <Pencil className="size-4" />
                                    </Button>
                                }
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer text-destructive hover:text-destructive"
                                onClick={() => handleDelete(category)}
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
