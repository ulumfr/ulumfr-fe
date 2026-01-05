import apiClient from "./api-client";
import type {
    Project,
    CreateProjectInput,
    UpdateProjectInput,
    ProjectListResponse,
    ProjectResponse,
} from "@/types/project";

export interface GetProjectsParams {
    page?: number;
    limit?: number;
}

export async function getProjects(params?: GetProjectsParams): Promise<ProjectListResponse> {
    const response = await apiClient.get<ProjectListResponse>("/v1/admin/projects", {
        params,
    });
    return response.data;
}

export async function getProject(id: string): Promise<Project> {
    const response = await apiClient.get<ProjectResponse>(`/v1/admin/projects/${id}`);
    return response.data.data;
}

export async function createProject(data: CreateProjectInput): Promise<Project> {
    const response = await apiClient.post<ProjectResponse>("/v1/admin/projects", data);
    return response.data.data;
}

export async function updateProject(id: string, data: UpdateProjectInput): Promise<Project> {
    const response = await apiClient.put<ProjectResponse>(`/v1/admin/projects/${id}`, data);
    return response.data.data;
}

export async function deleteProject(id: string): Promise<void> {
    await apiClient.delete(`/v1/admin/projects/${id}`);
}
