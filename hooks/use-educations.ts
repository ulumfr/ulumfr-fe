"use client";

import { useEffect, useCallback } from "react";
import { useEducationsStore } from "@/store/use-educations-store";

export function useEducations() {
    const {
        educations,
        isLoading,
        error,
        fetchEducations,
        createEducation,
        updateEducation,
        deleteEducation,
        clearError,
    } = useEducationsStore();

    const loadEducations = useCallback(() => {
        fetchEducations();
    }, [fetchEducations]);

    useEffect(() => {
        loadEducations();
    }, [loadEducations]);

    return {
        educations,
        isLoading,
        error,
        refetch: loadEducations,
        createEducation,
        updateEducation,
        deleteEducation,
        clearError,
    };
}
