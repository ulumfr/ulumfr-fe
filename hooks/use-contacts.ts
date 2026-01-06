"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import contactService from "@/services/contact-service";
import type { ContactQueryParams } from "@/types/contact";

export function useContacts(initialParams?: ContactQueryParams) {
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["contacts", initialParams],
        queryFn: () => contactService.getContacts(initialParams),
    });

    const markAsReadMutation = useMutation({
        mutationFn: (id: string) => contactService.markAsRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => contactService.deleteContact(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
            toast.success("Contact deleted successfully");
        },
    });

    return {
        contacts: data?.data || [],
        pagination: data?.pagination,
        isLoading,
        error: error?.message || null,
        refetch: () => refetch(),
        markAsRead: (id: string) => markAsReadMutation.mutateAsync(id),
        deleteContact: (id: string) => deleteMutation.mutateAsync(id),
    };
}
