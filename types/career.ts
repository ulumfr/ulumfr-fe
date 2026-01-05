export interface Career {
    id: string;
    company: string;
    position: string;
    location?: string;
    description?: string;
    start_date: string;
    end_date?: string;
    is_current: boolean;
    logo_url?: string;
    company_url?: string;
    sort_order?: number;
    created_at: string;
}

export interface CreateCareerInput {
    company: string;
    position: string;
    location?: string;
    description?: string;
    start_date: string;
    end_date?: string;
    is_current?: boolean;
    logo_url?: string;
    company_url?: string;
    sort_order?: number;
}

export interface UpdateCareerInput {
    company?: string;
    position?: string;
    location?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    is_current?: boolean;
    logo_url?: string;
    company_url?: string;
    sort_order?: number;
}

export interface CareerListResponse {
    success: boolean;
    data: Career[];
}

export interface CareerResponse {
    success: boolean;
    data: Career;
}
