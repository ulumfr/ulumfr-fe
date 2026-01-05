export interface Education {
    id: string;
    school: string;
    degree: string;
    field?: string;
    location?: string;
    description?: string;
    start_date: string;
    end_date?: string;
    gpa?: string;
    logo_url?: string;
    school_url?: string;
    sort_order?: number;
    created_at: string;
}

export interface CreateEducationInput {
    school: string;
    degree: string;
    field?: string;
    location?: string;
    description?: string;
    start_date: string;
    end_date?: string;
    gpa?: string;
    logo_url?: string;
    school_url?: string;
    sort_order?: number;
}

export interface UpdateEducationInput {
    school?: string;
    degree?: string;
    field?: string;
    location?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    gpa?: string;
    logo_url?: string;
    school_url?: string;
    sort_order?: number;
}

export interface EducationListResponse {
    success: boolean;
    data: Education[];
}

export interface EducationResponse {
    success: boolean;
    data: Education;
}
