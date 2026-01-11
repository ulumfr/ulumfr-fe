export interface Certificate {
    id: string;
    name: string;
    issuer: string;
    issue_date: string;
    expiry_date?: string;
    credential_id?: string;
    credential_url?: string;
    image_url?: string;
    description?: string;
    sort_order?: number;
    created_at: string;
    updated_at: string;
}

export interface CreateCertificateInput {
    name: string;
    issuer: string;
    issue_date: string;
    expiry_date?: string;
    credential_id?: string;
    credential_url?: string;
    image_url?: string;
    description?: string;
    sort_order?: number;
}

export interface UpdateCertificateInput {
    name?: string;
    issuer?: string;
    issue_date?: string;
    expiry_date?: string;
    credential_id?: string;
    credential_url?: string;
    image_url?: string;
    description?: string;
    sort_order?: number;
}

export interface CertificateListResponse {
    success: boolean;
    data: Certificate[];
}

export interface CertificateResponse {
    success: boolean;
    data: Certificate;
}
