"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import aboutService from "@/services/about-service";
import type { CreateAboutInput, UpdateAboutInput } from "@/types/about";

export function useAbout() {
    const queryClient = useQueryClient();

    const {
        data: aboutList = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["about"],
        queryFn: () => aboutService.getAboutList(),
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateAboutInput) => aboutService.createAbout(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["about"] });
            toast.success("Profile created successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create profile");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateAboutInput }) =>
            aboutService.updateAbout(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["about"] });
            toast.success("Profile updated successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update profile");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => aboutService.deleteAbout(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["about"] });
            toast.success("Profile deleted successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete profile");
        },
    });

    return {
        aboutList,
        isLoading,
        error: error?.message || null,
        refetch,
        createAbout: (data: CreateAboutInput) => createMutation.mutateAsync(data),
        updateAbout: (id: string, data: UpdateAboutInput) => updateMutation.mutateAsync({ id, data }),
        deleteAbout: (id: string) => deleteMutation.mutateAsync(id),
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
}
