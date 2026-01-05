import apiClient from "./api-client";
import type {
    Contact,
    ContactApiResponse,
    ContactListApiResponse,
    ContactQueryParams,
} from "@/types/contact";

export async function getContacts(
    params?: ContactQueryParams
): Promise<ContactListApiResponse> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.is_read !== undefined)
        queryParams.append("is_read", params.is_read.toString());

    const queryString = queryParams.toString();
    const url = `/v1/admin/contacts${queryString ? `?${queryString}` : ""}`;

    const response = await apiClient.get<ContactListApiResponse>(url);
    return response.data;
}

export async function getContactById(id: string): Promise<Contact> {
    const response = await apiClient.get<ContactApiResponse>(
        `/v1/admin/contacts/${id}`
    );
    return response.data.data;
}

export async function markAsRead(id: string): Promise<void> {
    await apiClient.put(`/v1/admin/contacts/${id}/read`);
}

export async function deleteContact(id: string): Promise<void> {
    await apiClient.delete(`/v1/admin/contacts/${id}`);
}

export const contactService = {
    getContacts,
    getContactById,
    markAsRead,
    deleteContact,
};

export default contactService;
