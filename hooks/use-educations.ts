"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import educationService from "@/services/education-service";
import type { CreateEducationInput, UpdateEducationInput } from "@/types/education";

export function useEducations() {
    const queryClient = useQueryClient();

    const {
        data: educations = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["educations"],
        queryFn: () => educationService.getEducations(),
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateEducationInput) => educationService.createEducation(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["educations"] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateEducationInput }) =>
            educationService.updateEducation(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["educations"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => educationService.deleteEducation(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["educations"] });
            toast.success("Education deleted successfully");
        },
    });

    return {
        educations,
        isLoading,
        error: error?.message || null,
        refetch,
        createEducation: (data: CreateEducationInput) => createMutation.mutateAsync(data),
        updateEducation: (id: string, data: UpdateEducationInput) =>
            updateMutation.mutateAsync({ id, data }),
        deleteEducation: (id: string) => deleteMutation.mutateAsync(id),
    };
}
