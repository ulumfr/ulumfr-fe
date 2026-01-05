"use client";

import { useEffect, useCallback } from "react";
import { useProjectsStore } from "@/store/use-projects-store";

export function useProjects() {
    const {
        projects,
        pagination,
        isLoading,
        error,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        clearError,
    } = useProjectsStore();

    const loadProjects = useCallback(
        (params?: { page?: number; limit?: number }) => {
            fetchProjects(params);
        },
        [fetchProjects]
    );

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    return {
        projects,
        pagination,
        isLoading,
        error,
        refetch: loadProjects,
        createProject,
        updateProject,
        deleteProject,
        clearError,
    };
}
