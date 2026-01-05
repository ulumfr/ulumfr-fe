"use client";

import { useEffect, useCallback } from "react";
import { useCategoriesStore } from "@/store/use-categories-store";

export function useCategories() {
    const {
        categories,
        isLoading,
        error,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        clearError,
    } = useCategoriesStore();

    const loadCategories = useCallback(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    return {
        categories,
        isLoading,
        error,
        refetch: loadCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        clearError,
    };
}
