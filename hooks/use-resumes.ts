"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import resumeService from "@/services/resume-service";

export function useResumes() {
    const queryClient = useQueryClient();

    const {
        data: resumes = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["resumes"],
        queryFn: () => resumeService.getResumes(),
    });

    const uploadMutation = useMutation({
        mutationFn: async ({ file, version }: { file: File; version: string }) => {
            const contentType = file.type || "application/pdf";
            const presigned = await resumeService.getUploadUrl({
                file_name: file.name,
                content_type: contentType,
            });
            await resumeService.uploadFileToR2(presigned.upload_url, file, contentType);
            return resumeService.createResume({
                version,
                file_url: presigned.file_url,
                file_name: file.name,
                file_size: file.size,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumes"] });
            toast.success("Resume uploaded successfully");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => resumeService.deleteResume(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumes"] });
            toast.success("Resume deleted successfully");
        },
    });

    const setActiveMutation = useMutation({
        mutationFn: (id: string) => resumeService.activateResume(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resumes"] });
            toast.success("Active resume updated");
        },
    });

    return {
        resumes,
        isLoading,
        error: error?.message || null,
        refetch,
        uploadAndCreateResume: (file: File, version: string) =>
            uploadMutation.mutateAsync({ file, version }),
        deleteResume: (id: string) => deleteMutation.mutateAsync(id),
        setActiveResume: (id: string) => setActiveMutation.mutateAsync(id),
        isUploading: uploadMutation.isPending,
    };
}
