"use client";

import { useEffect, useCallback } from "react";
import { useResumesStore } from "@/store/use-resumes-store";

export function useResumes() {
    const {
        resumes,
        isLoading,
        isUploading,
        error,
        fetchResumes,
        createResume,
        updateResume,
        deleteResume,
        activateResume,
        uploadAndCreateResume,
        clearError,
    } = useResumesStore();

    const loadResumes = useCallback(() => {
        fetchResumes();
    }, [fetchResumes]);

    useEffect(() => {
        loadResumes();
    }, [loadResumes]);

    return {
        resumes,
        isLoading,
        isUploading,
        error,
        refetch: loadResumes,
        createResume,
        updateResume,
        deleteResume,
        activateResume,
        uploadAndCreateResume,
        clearError,
    };
}
