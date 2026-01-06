"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import tagService from "@/services/tag-service";
import type { CreateTagInput, UpdateTagInput } from "@/types/tag";

export function useTags() {
    const queryClient = useQueryClient();

    const {
        data: tags = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["tags"],
        queryFn: () => tagService.getTags(),
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateTagInput) => tagService.createTag(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tags"] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateTagInput }) =>
            tagService.updateTag(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tags"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => tagService.deleteTag(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tags"] });
            toast.success("Tag deleted successfully");
        },
    });

    return {
        tags,
        isLoading,
        error: error?.message || null,
        refetch,
        createTag: (data: CreateTagInput) => createMutation.mutateAsync(data),
        updateTag: (id: string, data: UpdateTagInput) =>
            updateMutation.mutateAsync({ id, data }),
        deleteTag: (id: string) => deleteMutation.mutateAsync(id),
    };
}
