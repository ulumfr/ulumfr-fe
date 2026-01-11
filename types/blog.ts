import type { Tag } from "./tag";

export interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    cover_image?: string;
    is_published: boolean;
    is_featured: boolean;
    published_at?: string;
    sort_order?: number;
    tags?: Tag[];
    created_at: string;
    updated_at: string;
}

export interface CreateBlogInput {
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    cover_image?: string;
    is_published?: boolean;
    is_featured?: boolean;
    published_at?: string;
    sort_order?: number;
    tag_ids?: string[];
}

export interface UpdateBlogInput {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    cover_image?: string;
    is_published?: boolean;
    is_featured?: boolean;
    published_at?: string;
    sort_order?: number;
    tag_ids?: string[];
}

export interface BlogListResponse {
    success: boolean;
    data: Blog[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
        has_next: boolean;
        has_prev: boolean;
    };
}

export interface BlogResponse {
    success: boolean;
    data: Blog;
}
