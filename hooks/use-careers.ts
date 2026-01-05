"use client";

import { useEffect, useCallback } from "react";
import { useCareersStore } from "@/store/use-careers-store";

export function useCareers() {
    const {
        careers,
        isLoading,
        error,
        fetchCareers,
        createCareer,
        updateCareer,
        deleteCareer,
        clearError,
    } = useCareersStore();

    const loadCareers = useCallback(() => {
        fetchCareers();
    }, [fetchCareers]);

    useEffect(() => {
        loadCareers();
    }, [loadCareers]);

    return {
        careers,
        isLoading,
        error,
        refetch: loadCareers,
        createCareer,
        updateCareer,
        deleteCareer,
        clearError,
    };
}
