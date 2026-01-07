import apiClient from "./api-client";

export interface UploadURLRequest {
    file_name: string;
    content_type: string;
    folder?: string;
}

export interface PresignedURLResponse {
    upload_url: string;
    file_url: string;
    key: string;
    expires_in: number;
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

/**
 * Upload a file to R2 storage and return the public URL
 * @param file - The file to upload
 * @param folder - The folder to store the file in (e.g., 'projects', 'careers', 'educations')
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(file: File, folder: string): Promise<string> {
    const contentType = file.type || "application/octet-stream";

    const presigned = await getUploadUrl({
        file_name: file.name,
        content_type: contentType,
        folder,
    });

    await uploadFileToR2(presigned.upload_url, file, contentType);

    return presigned.file_url;
}

export const uploadService = {
    getUploadUrl,
    uploadFileToR2,
    uploadFile,
};

export default uploadService;
