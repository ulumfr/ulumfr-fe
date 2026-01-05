import { create } from "zustand";
import type { Category, CreateCategoryInput, UpdateCategoryInput } from "@/types/category";
import * as categoryService from "@/services/category-service";

interface CategoriesState {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
}

interface CategoriesActions {
    fetchCategories: () => Promise<void>;
    createCategory: (data: CreateCategoryInput) => Promise<void>;
    updateCategory: (id: string, data: UpdateCategoryInput) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
    clearError: () => void;
}

type CategoriesStore = CategoriesState & CategoriesActions;

export const useCategoriesStore = create<CategoriesStore>((set, get) => ({
    categories: [],
    isLoading: false,
    error: null,

    fetchCategories: async () => {
        set({ isLoading: true, error: null });
        try {
            const categories = await categoryService.getCategories();
            set({ categories, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to fetch categories",
                isLoading: false,
            });
        }
    },

    createCategory: async (data: CreateCategoryInput) => {
        set({ isLoading: true, error: null });
        try {
            const newCategory = await categoryService.createCategory(data);
            set({
                categories: [...get().categories, newCategory],
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to create category",
                isLoading: false,
            });
            throw error;
        }
    },

    updateCategory: async (id: string, data: UpdateCategoryInput) => {
        set({ isLoading: true, error: null });
        try {
            const updatedCategory = await categoryService.updateCategory(id, data);
            set({
                categories: get().categories.map((c) =>
                    c.id === id ? updatedCategory : c
                ),
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to update category",
                isLoading: false,
            });
            throw error;
        }
    },

    deleteCategory: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await categoryService.deleteCategory(id);
            set({
                categories: get().categories.filter((c) => c.id !== id),
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to delete category",
                isLoading: false,
            });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));
