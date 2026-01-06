export interface Tag {
    id: string;
    name: string;
    slug: string;
    icon_url?: string;
    created_at: string;
}

export interface CreateTagInput {
    name: string;
    slug: string;
    icon_url?: string;
}

export interface UpdateTagInput {
    name?: string;
    slug?: string;
    icon_url?: string;
}

export interface TagListResponse {
    success: boolean;
    data: Tag[];
}

export interface TagResponse {
    success: boolean;
    data: Tag;
}
