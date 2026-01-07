"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import projectService from "@/services/project-service";
import type { CreateProjectInput, UpdateProjectInput } from "@/types/project";

export function useProjects() {
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["projects"],
        queryFn: () => projectService.getProjects(),
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateProjectInput) => projectService.createProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateProjectInput }) =>
            projectService.updateProject(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => projectService.deleteProject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Project deleted successfully");
        },
    });

    return {
        projects: data?.data || [],
        pagination: data?.pagination,
        isLoading,
        error: error?.message || null,
        refetch,
        createProject: (data: CreateProjectInput) => createMutation.mutateAsync(data),
        updateProject: (id: string, data: UpdateProjectInput) => updateMutation.mutateAsync({ id, data }),
        deleteProject: (id: string) => deleteMutation.mutateAsync(id),
    };
}
