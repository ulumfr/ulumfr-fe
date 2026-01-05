import { create } from "zustand";
import type { Career, CreateCareerInput, UpdateCareerInput } from "@/types/career";
import * as careerService from "@/services/career-service";

interface CareersState {
    careers: Career[];
    isLoading: boolean;
    error: string | null;
}

interface CareersActions {
    fetchCareers: () => Promise<void>;
    createCareer: (data: CreateCareerInput) => Promise<void>;
    updateCareer: (id: string, data: UpdateCareerInput) => Promise<void>;
    deleteCareer: (id: string) => Promise<void>;
    clearError: () => void;
}

type CareersStore = CareersState & CareersActions;

export const useCareersStore = create<CareersStore>((set, get) => ({
    careers: [],
    isLoading: false,
    error: null,

    fetchCareers: async () => {
        set({ isLoading: true, error: null });
        try {
            const careers = await careerService.getCareers();
            set({ careers, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to fetch careers",
                isLoading: false,
            });
        }
    },

    createCareer: async (data: CreateCareerInput) => {
        set({ isLoading: true, error: null });
        try {
            const newCareer = await careerService.createCareer(data);
            set({
                careers: [...get().careers, newCareer],
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to create career",
                isLoading: false,
            });
            throw error;
        }
    },

    updateCareer: async (id: string, data: UpdateCareerInput) => {
        set({ isLoading: true, error: null });
        try {
            const updatedCareer = await careerService.updateCareer(id, data);
            set({
                careers: get().careers.map((c) =>
                    c.id === id ? updatedCareer : c
                ),
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to update career",
                isLoading: false,
            });
            throw error;
        }
    },

    deleteCareer: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await careerService.deleteCareer(id);
            set({
                careers: get().careers.filter((c) => c.id !== id),
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to delete career",
                isLoading: false,
            });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}));
