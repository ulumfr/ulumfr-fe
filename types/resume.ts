export interface Resume {
    id: string;
    file_url: string;
    file_name: string;
    file_size: number;
    version: string;
    is_active: boolean;
    created_at: string;
}

export interface ResumeApiResponse {
    success: boolean;
    data: Resume;
}

export interface ResumeListApiResponse {
    success: boolean;
    data: Resume[];
}

export interface CreateResumeInput {
    file_url: string;
    file_name: string;
    file_size?: number;
    version?: string;
    is_active?: boolean;
}

export interface UpdateResumeInput {
    file_url?: string;
    file_name?: string;
    file_size?: number;
    version?: string;
    is_active?: boolean;
}

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
