import apiClient from "./api-client";
import type {
    Tag,
    CreateTagInput,
    UpdateTagInput,
    TagListResponse,
    TagResponse,
} from "@/types/tag";

export async function getTags(): Promise<Tag[]> {
    const response = await apiClient.get<TagListResponse>("/v1/admin/tags");
    return response.data.data;
}

export async function getTag(id: string): Promise<Tag> {
    const response = await apiClient.get<TagResponse>(`/v1/admin/tags/${id}`);
    return response.data.data;
}

export async function createTag(data: CreateTagInput): Promise<Tag> {
    const response = await apiClient.post<TagResponse>("/v1/admin/tags", data);
    return response.data.data;
}

export async function updateTag(id: string, data: UpdateTagInput): Promise<Tag> {
    const response = await apiClient.put<TagResponse>(`/v1/admin/tags/${id}`, data);
    return response.data.data;
}

export async function deleteTag(id: string): Promise<void> {
    await apiClient.delete(`/v1/admin/tags/${id}`);
}
