import { create } from "zustand";
import type { Education, CreateEducationInput, UpdateEducationInput } from "@/types/education";
import * as educationService from "@/services/education-service";

interface EducationsState {
    educations: Education[];
    isLoading: boolean;
    error: string | null;
}

interface EducationsActions {
    fetchEducations: () => Promise<void>;
    createEducation: (data: CreateEducationInput) => Promise<void>;
    updateEducation: (id: string, data: UpdateEducationInput) => Promise<void>;
    deleteEducation: (id: string) => Promise<void>;
    clearError: () => void;
}

type EducationsStore = EducationsState & EducationsActions;

export const useEducationsStore = create<EducationsStore>((set, get) => ({
    educations: [],
    isLoading: false,
    error: null,

    fetchEducations: async () => {
        set({ isLoading: true, error: null });
        try {
            const educations = await educationService.getEducations();
            set({ educations, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to fetch educations",
                isLoading: false,
            });
        }
    },

    createEducation: async (data: CreateEducationInput) => {
        set({ isLoading: true, error: null });
        try {
            const newEducation = await educationService.createEducation(data);
            set({
                educations: [...get().educations, newEducation],
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to create education",
                isLoading: false,
            });
            throw error;
        }
    },

    updateEducation: async (id: string, data: UpdateEducationInput) => {
        set({ isLoading: true, error: null });
        try {
            const updatedEducation = await educationService.updateEducation(id, data);
            set({
                educations: get().educations.map((e) =>
                    e.id === id ? updatedEducation : e
                ),
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to update education",
                isLoading: false,
            });
            throw error;
        }
    },

    deleteEducation: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await educationService.deleteEducation(id);
            set({
                educations: get().educations.filter((e) => e.id !== id),
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to delete education",
                isLoading: false,
            });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));
