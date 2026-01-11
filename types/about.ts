export interface About {
    id: string;
    full_name: string;
    nickname?: string;
    role: string;
    bio?: string;
    avatar_url?: string;
    cover_url?: string;
    location?: string;
    email?: string;
    phone?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateAboutInput {
    full_name: string;
    nickname?: string;
    role: string;
    bio?: string;
    avatar_url?: string;
    cover_url?: string;
    location?: string;
    email?: string;
    phone?: string;
    is_active?: boolean;
}

export interface UpdateAboutInput {
    full_name?: string;
    nickname?: string;
    role?: string;
    bio?: string;
    avatar_url?: string;
    cover_url?: string;
    location?: string;
    email?: string;
    phone?: string;
    is_active?: boolean;
}

export interface AboutListResponse {
    success: boolean;
    data: About[];
}

export interface AboutResponse {
    success: boolean;
    data: About;
}
