import apiClient from "./api-client";
import type {
    Certificate,
    CreateCertificateInput,
    UpdateCertificateInput,
    CertificateListResponse,
    CertificateResponse,
} from "@/types/certificate";

export async function getCertificates(): Promise<Certificate[]> {
    const response = await apiClient.get<CertificateListResponse>("/v1/admin/certificates");
    return response.data.data;
}

export async function createCertificate(data: CreateCertificateInput): Promise<Certificate> {
    const response = await apiClient.post<CertificateResponse>("/v1/admin/certificates", data);
    return response.data.data;
}

export async function updateCertificate(id: string, data: UpdateCertificateInput): Promise<Certificate> {
    const response = await apiClient.put<CertificateResponse>(`/v1/admin/certificates/${id}`, data);
    return response.data.data;
}

export async function deleteCertificate(id: string): Promise<void> {
    await apiClient.delete(`/v1/admin/certificates/${id}`);
}

const certificateService = {
    getCertificates,
    createCertificate,
    updateCertificate,
    deleteCertificate,
};

export default certificateService;
