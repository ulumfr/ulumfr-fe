import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import type { AuthStore, User, LoginResponse } from "@/types/auth";

const COOKIE_OPTIONS = {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
            isHydrated: false,

            setTokens: (accessToken: string, refreshToken: string) => {
                Cookies.set("accessToken", accessToken, COOKIE_OPTIONS);
                Cookies.set("refreshToken", refreshToken, COOKIE_OPTIONS);

                set({
                    accessToken,
                    refreshToken,
                    isAuthenticated: true,
                });
            },

            setUser: (user: User) => {
                set({ user });
            },

            login: (response: LoginResponse) => {
                const { accessToken, refreshToken, user } = response;

                Cookies.set("accessToken", accessToken, COOKIE_OPTIONS);
                Cookies.set("refreshToken", refreshToken, COOKIE_OPTIONS);

                set({
                    accessToken,
                    refreshToken,
                    user,
                    isAuthenticated: true,
                });
            },

            logout: () => {
                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");

                set({
                    accessToken: null,
                    refreshToken: null,
                    user: null,
                    isAuthenticated: false,
                });
            },

            setHydrated: (hydrated: boolean) => {
                set({ isHydrated: hydrated });
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setHydrated(true);

                    if (state.accessToken && state.refreshToken) {
                        Cookies.set("accessToken", state.accessToken, COOKIE_OPTIONS);
                        Cookies.set("refreshToken", state.refreshToken, COOKIE_OPTIONS);
                    }
                }
            },
        }
    )
);

export const useAccessToken = () => useAuthStore((state) => state.accessToken);
export const useRefreshToken = () => useAuthStore((state) => state.refreshToken);
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useIsHydrated = () => useAuthStore((state) => state.isHydrated);
