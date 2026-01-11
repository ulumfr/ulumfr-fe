import apiClient from "./api-client";
import type {
    Blog,
    CreateBlogInput,
    UpdateBlogInput,
    BlogListResponse,
    BlogResponse,
} from "@/types/blog";

export interface GetBlogsParams {
    page?: number;
    limit?: number;
}

export async function getBlogs(params?: GetBlogsParams): Promise<BlogListResponse> {
    const response = await apiClient.get<BlogListResponse>("/v1/admin/blogs", {
        params,
    });
    return response.data;
}

export async function getBlog(id: string): Promise<Blog> {
    const response = await apiClient.get<BlogResponse>(`/v1/admin/blogs/${id}`);
    return response.data.data;
}

export async function createBlog(data: CreateBlogInput): Promise<Blog> {
    const response = await apiClient.post<BlogResponse>("/v1/admin/blogs", data);
    return response.data.data;
}

export async function updateBlog(id: string, data: UpdateBlogInput): Promise<Blog> {
    const response = await apiClient.put<BlogResponse>(`/v1/admin/blogs/${id}`, data);
    return response.data.data;
}

export async function deleteBlog(id: string): Promise<void> {
    await apiClient.delete(`/v1/admin/blogs/${id}`);
}

const blogService = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
};

export default blogService;
