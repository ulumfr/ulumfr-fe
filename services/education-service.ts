import apiClient from "./api-client";
import type {
    Education,
    CreateEducationInput,
    UpdateEducationInput,
    EducationListResponse,
    EducationResponse,
} from "@/types/education";

export async function getEducations(): Promise<Education[]> {
    const response = await apiClient.get<EducationListResponse>("/v1/admin/educations");
    return response.data.data;
}

export async function getEducation(id: string): Promise<Education> {
    const response = await apiClient.get<EducationResponse>(`/v1/admin/educations/${id}`);
    return response.data.data;
}

export async function createEducation(data: CreateEducationInput): Promise<Education> {
    const response = await apiClient.post<EducationResponse>("/v1/admin/educations", data);
    return response.data.data;
}

export async function updateEducation(id: string, data: UpdateEducationInput): Promise<Education> {
    const response = await apiClient.put<EducationResponse>(`/v1/admin/educations/${id}`, data);
    return response.data.data;
}

export async function deleteEducation(id: string): Promise<void> {
    await apiClient.delete(`/v1/admin/educations/${id}`);
}

const educationService = {
    getEducations,
    getEducation,
    createEducation,
    updateEducation,
    deleteEducation,
};

export default educationService;
