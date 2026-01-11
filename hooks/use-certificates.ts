"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import certificateService from "@/services/certificate-service";
import type { CreateCertificateInput, UpdateCertificateInput } from "@/types/certificate";

export function useCertificates() {
    const queryClient = useQueryClient();

    const {
        data: certificates = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["certificates"],
        queryFn: () => certificateService.getCertificates(),
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateCertificateInput) => certificateService.createCertificate(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["certificates"] });
            toast.success("Certificate created successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to create certificate");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateCertificateInput }) =>
            certificateService.updateCertificate(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["certificates"] });
            toast.success("Certificate updated successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update certificate");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => certificateService.deleteCertificate(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["certificates"] });
            toast.success("Certificate deleted successfully");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete certificate");
        },
    });

    return {
        certificates,
        isLoading,
        error: error?.message || null,
        refetch,
        createCertificate: (data: CreateCertificateInput) => createMutation.mutateAsync(data),
        updateCertificate: (id: string, data: UpdateCertificateInput) => updateMutation.mutateAsync({ id, data }),
        deleteCertificate: (id: string) => deleteMutation.mutateAsync(id),
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
}
