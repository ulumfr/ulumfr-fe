export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    created_at: string;
}

export interface CreateCategoryInput {
    name: string;
    slug: string;
    description?: string;
}

export interface UpdateCategoryInput {
    name?: string;
    slug?: string;
    description?: string;
}

export interface CategoryListResponse {
    success: boolean;
    data: Category[];
}

export interface CategoryResponse {
    success: boolean;
    data: Category;
}
