// Contact entity types based on Swagger API specification

export interface Contact {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

// API Response types
export interface ContactApiResponse {
    success: boolean;
    data: Contact;
}

export interface ContactListApiResponse {
    success: boolean;
    data: Contact[];
    pagination: Pagination;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}

// Query params for fetching contacts
export interface ContactQueryParams {
    page?: number;
    limit?: number;
    is_read?: boolean;
}
