import { create } from "zustand";
import type { Tag, CreateTagInput, UpdateTagInput } from "@/types/tag";
import * as tagService from "@/services/tag-service";

interface TagsState {
    tags: Tag[];
    isLoading: boolean;
    error: string | null;
}

interface TagsActions {
    fetchTags: () => Promise<void>;
    createTag: (data: CreateTagInput) => Promise<void>;
    updateTag: (id: string, data: UpdateTagInput) => Promise<void>;
    deleteTag: (id: string) => Promise<void>;
    clearError: () => void;
}

type TagsStore = TagsState & TagsActions;

export const useTagsStore = create<TagsStore>((set, get) => ({
    tags: [],
    isLoading: false,
    error: null,

    fetchTags: async () => {
        set({ isLoading: true, error: null });
        try {
            const tags = await tagService.getTags();
            set({ tags, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to fetch tags",
                isLoading: false,
            });
        }
    },

    createTag: async (data: CreateTagInput) => {
        set({ isLoading: true, error: null });
        try {
            const newTag = await tagService.createTag(data);
            set({
                tags: [...get().tags, newTag],
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to create tag",
                isLoading: false,
            });
            throw error;
        }
    },

    updateTag: async (id: string, data: UpdateTagInput) => {
        set({ isLoading: true, error: null });
        try {
            const updatedTag = await tagService.updateTag(id, data);
            set({
                tags: get().tags.map((t) => (t.id === id ? updatedTag : t)),
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to update tag",
                isLoading: false,
            });
            throw error;
        }
    },

    deleteTag: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await tagService.deleteTag(id);
            set({
                tags: get().tags.filter((t) => t.id !== id),
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to delete tag",
                isLoading: false,
            });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));
