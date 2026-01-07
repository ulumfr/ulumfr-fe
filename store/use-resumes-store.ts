import { create } from "zustand";
import type { Resume, CreateResumeInput, UpdateResumeInput } from "@/types/resume";
import resumeService from "@/services/resume-service";

interface ResumesState {
    resumes: Resume[];
    isLoading: boolean;
    isUploading: boolean;
    error: string | null;
}

interface ResumesActions {
    fetchResumes: () => Promise<void>;
    createResume: (data: CreateResumeInput) => Promise<void>;
    updateResume: (id: string, data: UpdateResumeInput) => Promise<void>;
    deleteResume: (id: string) => Promise<void>;
    activateResume: (id: string) => Promise<void>;
    uploadAndCreateResume: (file: File, version?: string) => Promise<void>;
    setUploading: (uploading: boolean) => void;
    clearError: () => void;
}

type ResumesStore = ResumesState & ResumesActions;

export const useResumesStore = create<ResumesStore>()((set, get) => ({
    resumes: [],
    isLoading: false,
    isUploading: false,
    error: null,

    fetchResumes: async () => {
        set({ isLoading: true, error: null });
        try {
            const resumes = await resumeService.getResumes();
            set({ resumes, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to fetch resumes",
                isLoading: false,
            });
        }
    },

    createResume: async (data: CreateResumeInput) => {
        set({ isLoading: true, error: null });
        try {
            const newResume = await resumeService.createResume(data);
            set((state) => ({
                resumes: [...state.resumes, newResume],
                isLoading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to create resume",
                isLoading: false,
            });
        }
    },

    updateResume: async (id: string, data: UpdateResumeInput) => {
        set({ isLoading: true, error: null });
        try {
            const updatedResume = await resumeService.updateResume(id, data);
            set((state) => ({
                resumes: state.resumes.map((r) => (r.id === id ? updatedResume : r)),
                isLoading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to update resume",
                isLoading: false,
            });
        }
    },

    deleteResume: async (id: string) => {
        try {
            await resumeService.deleteResume(id);
            set((state) => ({
                resumes: state.resumes.filter((r) => r.id !== id),
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to delete resume",
            });
        }
    },

    activateResume: async (id: string) => {
        try {
            await resumeService.activateResume(id);
            set((state) => ({
                resumes: state.resumes.map((r) => ({
                    ...r,
                    is_active: r.id === id,
                })),
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to activate resume",
            });
        }
    },

    uploadAndCreateResume: async (file: File, version?: string) => {
        set({ isUploading: true, error: null });
        try {
            const contentType = file.type || "application/pdf";
            const presigned = await resumeService.getUploadUrl({
                file_name: file.name,
                content_type: contentType,
                folder: "resumes",
            });

            await resumeService.uploadFileToR2(presigned.upload_url, file, contentType);

            const newResume = await resumeService.createResume({
                file_url: presigned.file_url,
                file_name: file.name,
                file_size: file.size,
                version: version || "1.0",
                is_active: false,
            });

            set((state) => ({
                resumes: [...state.resumes, newResume],
                isUploading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to upload resume",
                isUploading: false,
            });
        }
    },

    setUploading: (uploading: boolean) => set({ isUploading: uploading }),
    clearError: () => set({ error: null }),
}));

export const useResumes = () => useResumesStore((state) => state.resumes);
export const useActiveResume = () => useResumesStore((state) => state.resumes.find((r) => r.is_active));
export const useResumesLoading = () => useResumesStore((state) => state.isLoading);
export const useResumesUploading = () => useResumesStore((state) => state.isUploading);
export const useResumesError = () => useResumesStore((state) => state.error);
