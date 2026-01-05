import type { Category } from "./category";
import type { Tag } from "./tag";

export interface ProjectImage {
    id: string;
    url: string;
    alt?: string;
    sort_order?: number;
}

export interface Project {
    id: string;
    title: string;
    slug: string;
    description?: string;
    content?: string;
    thumbnail_url?: string;
    demo_url?: string;
    repo_url?: string;
    is_published: boolean;
    is_featured: boolean;
    sort_order?: number;
    categories?: Category[];
    tags?: Tag[];
    images?: ProjectImage[];
    created_at: string;
    updated_at: string;
}

export interface CreateProjectInput {
    title: string;
    slug: string;
    description?: string;
    content?: string;
    thumbnail_url?: string;
    demo_url?: string;
    repo_url?: string;
    is_published?: boolean;
    is_featured?: boolean;
    sort_order?: number;
    category_ids?: string[];
    tag_ids?: string[];
}

export interface UpdateProjectInput {
    title?: string;
    slug?: string;
    description?: string;
    content?: string;
    thumbnail_url?: string;
    demo_url?: string;
    repo_url?: string;
    is_published?: boolean;
    is_featured?: boolean;
    sort_order?: number;
    category_ids?: string[];
    tag_ids?: string[];
}

export interface ProjectListResponse {
    success: boolean;
    data: Project[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
        has_next: boolean;
        has_prev: boolean;
    };
}

export interface ProjectResponse {
    success: boolean;
    data: Project;
}
