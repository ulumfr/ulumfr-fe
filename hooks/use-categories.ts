"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import categoryService from "@/services/category-service";
import type { CreateCategoryInput, UpdateCategoryInput } from "@/types/category";

export function useCategories() {
    const queryClient = useQueryClient();

    const {
        data: categories = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => categoryService.getCategories(),
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateCategoryInput) => categoryService.createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateCategoryInput }) =>
            categoryService.updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => categoryService.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category deleted successfully");
        },
    });

    return {
        categories,
        isLoading,
        error: error?.message || null,
        refetch,
        createCategory: (data: CreateCategoryInput) => createMutation.mutateAsync(data),
        updateCategory: (id: string, data: UpdateCategoryInput) => updateMutation.mutateAsync({ id, data }),
        deleteCategory: (id: string) => deleteMutation.mutateAsync(id),
    };
}
