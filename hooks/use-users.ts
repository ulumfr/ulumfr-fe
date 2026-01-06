"use client";

import { useQuery } from "@tanstack/react-query";
import userService from "@/services/user-service";

export function useUsers() {
    const {
        data: users = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: userService.getUsers,
    });

    return {
        users,
        isLoading,
        error: error?.message || null,
        refetch,
    };
}
