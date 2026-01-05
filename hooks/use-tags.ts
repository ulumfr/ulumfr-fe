"use client";

import { useEffect, useCallback } from "react";
import { useTagsStore } from "@/store/use-tags-store";

export function useTags() {
    const {
        tags,
        isLoading,
        error,
        fetchTags,
        createTag,
        updateTag,
        deleteTag,
        clearError,
    } = useTagsStore();

    const loadTags = useCallback(() => {
        fetchTags();
    }, [fetchTags]);

    useEffect(() => {
        loadTags();
    }, [loadTags]);

    return {
        tags,
        isLoading,
        error,
        refetch: loadTags,
        createTag,
        updateTag,
        deleteTag,
        clearError,
    };
}
