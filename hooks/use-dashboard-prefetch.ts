"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import projectService from "@/services/project-service";
import categoryService from "@/services/category-service";
import tagService from "@/services/tag-service";
import careerService from "@/services/career-service";
import educationService from "@/services/education-service";
import contactService from "@/services/contact-service";
import resumeService from "@/services/resume-service";

export function useDashboardPrefetch() {
    const queryClient = useQueryClient();
    const hasPrefetched = useRef(false);

    useEffect(() => {
        if (hasPrefetched.current) return;
        hasPrefetched.current = true;

        Promise.allSettled([
            queryClient.prefetchQuery({
                queryKey: ["projects"],
                queryFn: () => projectService.getProjects(),
            }),
            queryClient.prefetchQuery({
                queryKey: ["categories"],
                queryFn: () => categoryService.getCategories(),
            }),
            queryClient.prefetchQuery({
                queryKey: ["tags"],
                queryFn: () => tagService.getTags(),
            }),
            queryClient.prefetchQuery({
                queryKey: ["careers"],
                queryFn: () => careerService.getCareers(),
            }),
            queryClient.prefetchQuery({
                queryKey: ["educations"],
                queryFn: () => educationService.getEducations(),
            }),
            queryClient.prefetchQuery({
                queryKey: ["contacts", undefined],
                queryFn: () => contactService.getContacts(),
            }),
            queryClient.prefetchQuery({
                queryKey: ["resumes"],
                queryFn: () => resumeService.getResumes(),
            }),
        ]);
    }, [queryClient]);
}
