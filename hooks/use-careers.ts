"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import careerService from "@/services/career-service";
import type { CreateCareerInput, UpdateCareerInput } from "@/types/career";

export function useCareers() {
    const queryClient = useQueryClient();

    const {
        data: careers = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["careers"],
        queryFn: () => careerService.getCareers(),
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateCareerInput) => careerService.createCareer(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["careers"] });
            toast.success("Career created successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create career");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateCareerInput }) =>
            careerService.updateCareer(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["careers"] });
            toast.success("Career updated successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update career");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => careerService.deleteCareer(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["careers"] });
            toast.success("Career deleted successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete career");
        },
    });

    return {
        careers,
        isLoading,
        error: error?.message || null,
        refetch,
        createCareer: (data: CreateCareerInput) => createMutation.mutateAsync(data),
        updateCareer: (id: string, data: UpdateCareerInput) =>
            updateMutation.mutateAsync({ id, data }),
        deleteCareer: (id: string) => deleteMutation.mutateAsync(id),
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
}
