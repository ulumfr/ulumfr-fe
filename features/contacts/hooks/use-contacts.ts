"use client";

import { useEffect, useCallback } from "react";
import { useContactsStore } from "@/store/use-contacts-store";
import type { ContactQueryParams } from "@/types/contact";

export function useContacts(initialParams?: ContactQueryParams) {
    const {
        contacts,
        pagination,
        isLoading,
        error,
        fetchContacts,
        markAsRead,
        deleteContact,
        clearError,
    } = useContactsStore();

    const loadContacts = useCallback(
        (params?: ContactQueryParams) => {
            fetchContacts(params || initialParams);
        },
        [fetchContacts, initialParams]
    );

    useEffect(() => {
        loadContacts();
    }, [loadContacts]);

    return {
        contacts,
        pagination,
        isLoading,
        error,
        refetch: loadContacts,
        markAsRead,
        deleteContact,
        clearError,
    };
}
