import apiClient from "./api-client";
import type {
    About,
    CreateAboutInput,
    UpdateAboutInput,
    AboutListResponse,
    AboutResponse,
} from "@/types/about";

export async function getAboutList(): Promise<About[]> {
    const response = await apiClient.get<AboutListResponse>("/v1/admin/about");
    return response.data.data;
}

export async function createAbout(data: CreateAboutInput): Promise<About> {
    const response = await apiClient.post<AboutResponse>("/v1/admin/about", data);
    return response.data.data;
}

export async function updateAbout(id: string, data: UpdateAboutInput): Promise<About> {
    const response = await apiClient.put<AboutResponse>(`/v1/admin/about/${id}`, data);
    return response.data.data;
}

export async function deleteAbout(id: string): Promise<void> {
    await apiClient.delete(`/v1/admin/about/${id}`);
}

const aboutService = {
    getAboutList,
    createAbout,
    updateAbout,
    deleteAbout,
};

export default aboutService;
