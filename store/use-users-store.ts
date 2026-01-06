import { create } from "zustand";
import type { User } from "@/types/user";
import userService from "@/services/user-service";

interface UsersState {
    users: User[];
    isLoading: boolean;
    error: string | null;
}

interface UsersActions {
    fetchUsers: () => Promise<void>;
    clearError: () => void;
}

type UsersStore = UsersState & UsersActions;

export const useUsersStore = create<UsersStore>()((set) => ({
    users: [],
    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const users = await userService.getUsers();
            set({ users, isLoading: false });
        } catch (error: unknown) {
            let errorMessage = "Failed to fetch users";
            if (error && typeof error === "object" && "response" in error) {
                const axiosError = error as { response?: { data?: { error?: string } } };
                errorMessage = axiosError.response?.data?.error || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            set({
                error: errorMessage,
                isLoading: false,
            });
        }
    },

    clearError: () => set({ error: null }),
}));

// Selector hooks
export const useUsers = () => useUsersStore((state) => state.users);
export const useUsersLoading = () => useUsersStore((state) => state.isLoading);
export const useUsersError = () => useUsersStore((state) => state.error);
