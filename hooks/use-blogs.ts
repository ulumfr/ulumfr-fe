"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import blogService, { type GetBlogsParams } from "@/services/blog-service";
import type { CreateBlogInput, UpdateBlogInput, BlogListResponse } from "@/types/blog";

export function useBlogs(params?: GetBlogsParams) {
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["blogs", params],
        queryFn: () => blogService.getBlogs(params),
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateBlogInput) => blogService.createBlog(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            toast.success("Blog created successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create blog");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateBlogInput }) =>
            blogService.updateBlog(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            toast.success("Blog updated successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update blog");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => blogService.deleteBlog(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            toast.success("Blog deleted successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete blog");
        },
    });

    return {
        blogs: data?.data || [],
        pagination: data?.pagination,
        isLoading,
        error: error?.message || null,
        refetch,
        createBlog: (data: CreateBlogInput) => createMutation.mutateAsync(data),
        updateBlog: (id: string, data: UpdateBlogInput) => updateMutation.mutateAsync({ id, data }),
        deleteBlog: (id: string) => deleteMutation.mutateAsync(id),
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
}
