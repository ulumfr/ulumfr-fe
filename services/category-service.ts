import apiClient from "./api-client";
import type {
    Category,
    CreateCategoryInput,
    UpdateCategoryInput,
    CategoryListResponse,
    CategoryResponse,
} from "@/types/category";

export async function getCategories(): Promise<Category[]> {
    const response = await apiClient.get<CategoryListResponse>("/v1/admin/categories");
    return response.data.data;
}

export async function getCategory(id: string): Promise<Category> {
    const response = await apiClient.get<CategoryResponse>(`/v1/admin/categories/${id}`);
    return response.data.data;
}

export async function createCategory(data: CreateCategoryInput): Promise<Category> {
    const response = await apiClient.post<CategoryResponse>("/v1/admin/categories", data);
    return response.data.data;
}

export async function updateCategory(id: string, data: UpdateCategoryInput): Promise<Category> {
    const response = await apiClient.put<CategoryResponse>(`/v1/admin/categories/${id}`, data);
    return response.data.data;
}

export async function deleteCategory(id: string): Promise<void> {
    await apiClient.delete(`/v1/admin/categories/${id}`);
}

const categoryService = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};

export default categoryService;
