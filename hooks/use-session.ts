"use client";

import { useEffect, useState } from "react";
import { useAuthStore, useIsHydrated } from "@/store/use-auth-store";
import Cookies from "js-cookie";

interface UseSessionReturn {
    isHydrated: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export function useSession(): UseSessionReturn {
    const isHydrated = useIsHydrated();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isHydrated) {
            return;
        }

        const accessToken = Cookies.get("accessToken");
        const storeToken = useAuthStore.getState().accessToken;

        if (storeToken && !accessToken) {
            const refreshToken = useAuthStore.getState().refreshToken;
            if (refreshToken) {
                Cookies.set("accessToken", storeToken, {
                    expires: 7,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                });
                Cookies.set("refreshToken", refreshToken, {
                    expires: 7,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                });
            }
        }

        if (accessToken && !storeToken) {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
        }

        setIsLoading(false);
    }, [isHydrated]);

    return {
        isHydrated,
        isAuthenticated,
        isLoading: !isHydrated || isLoading,
    };
}

export default useSession;
