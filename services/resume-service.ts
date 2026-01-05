import apiClient from "./api-client";
import type {
    Resume,
    ResumeApiResponse,
    ResumeListApiResponse,
    CreateResumeInput,
    UpdateResumeInput,
    UploadURLRequest,
    PresignedURLResponse,
} from "@/types/resume";

export async function getResumes(): Promise<Resume[]> {
    const response = await apiClient.get<ResumeListApiResponse>("/v1/admin/resumes");
    return response.data.data;
}

export async function createResume(data: CreateResumeInput): Promise<Resume> {
    const response = await apiClient.post<ResumeApiResponse>(
        "/v1/admin/resumes",
        data
    );
    return response.data.data;
}

export async function updateResume(
    id: string,
    data: UpdateResumeInput
): Promise<Resume> {
    const response = await apiClient.put<ResumeApiResponse>(
        `/v1/admin/resumes/${id}`,
        data
    );
    return response.data.data;
}

export async function deleteResume(id: string): Promise<void> {
    await apiClient.delete(`/v1/admin/resumes/${id}`);
}

export async function activateResume(id: string): Promise<void> {
    await apiClient.post(`/v1/admin/resumes/${id}/activate`);
}

export async function getUploadUrl(
    data: UploadURLRequest
): Promise<PresignedURLResponse> {
    const response = await apiClient.post<{ success: boolean; data: PresignedURLResponse }>(
        "/v1/admin/upload-url",
        data
    );
    return response.data.data;
}

export async function uploadFileToR2(
    uploadUrl: string,
    file: File,
    contentType: string
): Promise<void> {
    await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": contentType,
        },
    });
}

export const resumeService = {
    getResumes,
    createResume,
    updateResume,
    deleteResume,
    activateResume,
    getUploadUrl,
    uploadFileToR2,
};

export default resumeService;
