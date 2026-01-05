import apiClient from "./api-client";
import type {
    Career,
    CreateCareerInput,
    UpdateCareerInput,
    CareerListResponse,
    CareerResponse,
} from "@/types/career";

export async function getCareers(): Promise<Career[]> {
    const response = await apiClient.get<CareerListResponse>("/v1/admin/careers");
    return response.data.data;
}

export async function getCareer(id: string): Promise<Career> {
    const response = await apiClient.get<CareerResponse>(`/v1/admin/careers/${id}`);
    return response.data.data;
}

export async function createCareer(data: CreateCareerInput): Promise<Career> {
    const response = await apiClient.post<CareerResponse>("/v1/admin/careers", data);
    return response.data.data;
}

export async function updateCareer(id: string, data: UpdateCareerInput): Promise<Career> {
    const response = await apiClient.put<CareerResponse>(`/v1/admin/careers/${id}`, data);
    return response.data.data;
}

export async function deleteCareer(id: string): Promise<void> {
    await apiClient.delete(`/v1/admin/careers/${id}`);
}
