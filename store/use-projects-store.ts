import { create } from "zustand";
import type { Project, CreateProjectInput, UpdateProjectInput } from "@/types/project";
import * as projectService from "@/services/project-service";

interface ProjectsState {
    projects: Project[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
        has_next: boolean;
        has_prev: boolean;
    } | null;
    isLoading: boolean;
    error: string | null;
}

interface ProjectsActions {
    fetchProjects: (params?: { page?: number; limit?: number }) => Promise<void>;
    createProject: (data: CreateProjectInput) => Promise<void>;
    updateProject: (id: string, data: UpdateProjectInput) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    clearError: () => void;
}

type ProjectsStore = ProjectsState & ProjectsActions;

export const useProjectsStore = create<ProjectsStore>((set, get) => ({
    projects: [],
    pagination: null,
    isLoading: false,
    error: null,

    fetchProjects: async (params) => {
        set({ isLoading: true, error: null });
        try {
            const response = await projectService.getProjects(params);
            set({
                projects: response.data,
                pagination: response.pagination || null,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to fetch projects",
                isLoading: false,
            });
        }
    },

    createProject: async (data: CreateProjectInput) => {
        set({ isLoading: true, error: null });
        try {
            const newProject = await projectService.createProject(data);
            set({
                projects: [...get().projects, newProject],
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to create project",
                isLoading: false,
            });
            throw error;
        }
    },

    updateProject: async (id: string, data: UpdateProjectInput) => {
        set({ isLoading: true, error: null });
        try {
            const updatedProject = await projectService.updateProject(id, data);
            set({
                projects: get().projects.map((p) =>
                    p.id === id ? updatedProject : p
                ),
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to update project",
                isLoading: false,
            });
            throw error;
        }
    },

    deleteProject: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await projectService.deleteProject(id);
            set({
                projects: get().projects.filter((p) => p.id !== id),
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to delete project",
                isLoading: false,
            });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));
