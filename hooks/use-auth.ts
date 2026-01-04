"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/use-auth-store";
import { authService } from "@/services/auth-service";
import {
    loginSchema,
    registerSchema,
    type LoginFormData,
    type RegisterFormData,
} from "@/schemas/auth-schema";
import type { ApiError } from "@/types/auth";
import { AxiosError } from "axios";

interface UseAuthReturn {
    isLoading: boolean;
    error: string | null;
    login: (data: LoginFormData) => Promise<boolean>;
    register: (data: RegisterFormData) => Promise<boolean>;
    logout: () => Promise<void>;
    clearError: () => void;
}

export function useAuth(): UseAuthReturn {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const storeLogout = useAuthStore((state) => state.logout);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const login = useCallback(
        async (data: LoginFormData): Promise<boolean> => {
            setIsLoading(true);
            setError(null);

            try {
                const validatedData = loginSchema.parse(data);

                await authService.login(validatedData);

                toast.success("Login berhasil!", {
                    description: "Selamat datang kembali.",
                });

                router.push("/dashboard");
                return true;
            } catch (err) {
                let errorMessage = "Terjadi kesalahan. Silakan coba lagi.";

                if (err instanceof AxiosError) {
                    const apiError = err.response?.data as ApiError;
                    errorMessage = apiError?.message || err.message;

                    if (err.response?.status === 401) {
                        errorMessage = "Email atau password salah.";
                    } else if (err.response?.status === 404) {
                        errorMessage = "Akun tidak ditemukan.";
                    }
                } else if (err instanceof Error) {
                    errorMessage = err.message;
                }

                setError(errorMessage);
                toast.error("Login gagal", {
                    description: errorMessage,
                });
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [router]
    );

    const register = useCallback(
        async (data: RegisterFormData): Promise<boolean> => {
            setIsLoading(true);
            setError(null);

            try {
                const validatedData = registerSchema.parse(data);

                const { name, email, password } = validatedData;

                await authService.register({ name, email, password });

                toast.success("Registrasi berhasil!", {
                    description: "Silakan login dengan akun baru Anda.",
                });

                router.push("/auth");
                return true;
            } catch (err) {
                let errorMessage = "Terjadi kesalahan. Silakan coba lagi.";

                if (err instanceof AxiosError) {
                    const apiError = err.response?.data as ApiError;
                    errorMessage = apiError?.message || err.message;

                    if (err.response?.status === 409) {
                        errorMessage = "Email sudah terdaftar.";
                    }
                } else if (err instanceof Error) {
                    errorMessage = err.message;
                }

                setError(errorMessage);
                toast.error("Registrasi gagal", {
                    description: errorMessage,
                });
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [router]
    );

    const logout = useCallback(async (): Promise<void> => {
        setIsLoading(true);

        try {
            await authService.logout();

            toast.success("Logout berhasil", {
                description: "Sampai jumpa lagi!",
            });

            router.push("/auth");
        } catch {
            storeLogout();
            router.push("/auth");
        } finally {
            setIsLoading(false);
        }
    }, [router, storeLogout]);

    return {
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
    };
}

export default useAuth;
