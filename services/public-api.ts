import axios from "axios";
import type { About } from "@/types/about";
import type { Project } from "@/types/project";
import type { Career } from "@/types/career";
import type { Education } from "@/types/education";
import type { Resume } from "@/types/resume";
import type { Tag } from "@/types/tag";
import type { Certificate } from "@/types/certificate";
import type { Blog } from "@/types/blog";
import type { Category } from "@/types/category";

const publicClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

export async function getPublicAbout(): Promise<About | null> {
    try {
        const res = await publicClient.get<{ success: boolean; data: About }>("/v1/public/about");
        return res.data.data;
    } catch {
        return null;
    }
}

export async function getPublicProjects(): Promise<Project[]> {
    try {
        const res = await publicClient.get<{ data: Project[] }>("/v1/public/projects");
        return res.data.data || [];
    } catch {
        return [];
    }
}

export async function getPublicCareers(): Promise<Career[]> {
    try {
        const res = await publicClient.get<{ success: boolean; data: Career[] }>("/v1/public/careers");
        return res.data.data || [];
    } catch {
        return [];
    }
}

export async function getPublicEducations(): Promise<Education[]> {
    try {
        const res = await publicClient.get<{ success: boolean; data: Education[] }>("/v1/public/educations");
        return res.data.data || [];
    } catch {
        return [];
    }
}

export async function getPublicResume(): Promise<Resume | null> {
    try {
        const res = await publicClient.get<{ success: boolean; data: Resume }>("/v1/public/resume");
        return res.data.data;
    } catch {
        return null;
    }
}

export async function getPublicTags(): Promise<Tag[]> {
    try {
        const res = await publicClient.get<{ success: boolean; data: Tag[] }>("/v1/public/tags");
        return res.data.data || [];
    } catch {
        return [];
    }
}

export async function getPublicCertificates(): Promise<Certificate[]> {
    try {
        const res = await publicClient.get<{ success: boolean; data: Certificate[] }>("/v1/public/certificates");
        return res.data.data || [];
    } catch {
        return [];
    }
}

export async function getPublicBlogs(): Promise<Blog[]> {
    try {
        const res = await publicClient.get<{ data: Blog[] }>("/v1/public/blogs");
        return res.data.data || [];
    } catch {
        return [];
    }
}

export async function getPublicCategories(): Promise<Category[]> {
    try {
        const res = await publicClient.get<{ success: boolean; data: Category[] }>("/v1/public/categories");
        return res.data.data || [];
    } catch {
        return [];
    }
}

export interface ContactFormInput {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

export async function submitContact(data: ContactFormInput): Promise<boolean> {
    try {
        await publicClient.post("/v1/public/contact", data);
        return true;
    } catch {
        return false;
    }
}
