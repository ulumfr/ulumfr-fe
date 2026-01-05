"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/use-auth-store"
import { getCurrentUser } from "@/services/auth-service"

interface AdminGuardProps {
    children: React.ReactNode
}

export function AdminGuard({ children }: AdminGuardProps) {
    const router = useRouter()
    const { user, isAuthenticated, isHydrated } = useAuthStore()

    useEffect(() => {
        const checkAuth = async () => {
            if (!isHydrated) return

            if (!isAuthenticated) {
                router.replace("/auth")
                return
            }

            // Fetch current user if not available
            let currentUser = user
            if (!currentUser) {
                try {
                    await getCurrentUser()
                    currentUser = useAuthStore.getState().user
                } catch {
                    router.replace("/auth")
                    return
                }
            }

            // Check role - redirect non-admin users
            if (currentUser && currentUser.role?.toUpperCase() !== "ADMIN") {
                router.replace("/")
                return
            }
        }

        checkAuth()
    }, [isAuthenticated, isHydrated, user, router])

    // Don't show loading, just render nothing while checking
    // This prevents the "loading flash" - user sees blank briefly then redirects
    if (!isHydrated || !isAuthenticated) {
        return null
    }

    // If user exists and is not admin, render nothing (redirect is happening)
    if (user && user.role?.toUpperCase() !== "ADMIN") {
        return null
    }

    return <>{children}</>
}
