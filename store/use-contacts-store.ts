import { create } from "zustand";
import type { Contact, Pagination, ContactQueryParams } from "@/types/contact";
import contactService from "@/services/contact-service";

interface ContactsState {
    contacts: Contact[];
    selectedContact: Contact | null;
    pagination: Pagination | null;
    isLoading: boolean;
    error: string | null;
}

interface ContactsActions {
    fetchContacts: (params?: ContactQueryParams) => Promise<void>;
    fetchContactById: (id: string) => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    deleteContact: (id: string) => Promise<void>;
    clearSelectedContact: () => void;
    clearError: () => void;
}

type ContactsStore = ContactsState & ContactsActions;

export const useContactsStore = create<ContactsStore>()((set, get) => ({
    contacts: [],
    selectedContact: null,
    pagination: null,
    isLoading: false,
    error: null,

    fetchContacts: async (params?: ContactQueryParams) => {
        set({ isLoading: true, error: null });
        try {
            const response = await contactService.getContacts(params);
            set({
                contacts: response.data,
                pagination: response.pagination,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to fetch contacts",
                isLoading: false,
            });
        }
    },

    fetchContactById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const contact = await contactService.getContactById(id);
            set({ selectedContact: contact, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to fetch contact",
                isLoading: false,
            });
        }
    },

    markAsRead: async (id: string) => {
        try {
            await contactService.markAsRead(id);
            // Update local state
            const contacts = get().contacts.map((c) =>
                c.id === id ? { ...c, is_read: true } : c
            );
            set({ contacts });

            // Update selected contact if it matches
            const selected = get().selectedContact;
            if (selected && selected.id === id) {
                set({ selectedContact: { ...selected, is_read: true } });
            }
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to mark as read",
            });
        }
    },

    deleteContact: async (id: string) => {
        try {
            await contactService.deleteContact(id);
            // Remove from local state
            const contacts = get().contacts.filter((c) => c.id !== id);
            set({ contacts });

            // Clear selected if it was deleted
            const selected = get().selectedContact;
            if (selected && selected.id === id) {
                set({ selectedContact: null });
            }
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to delete contact",
            });
        }
    },

    clearSelectedContact: () => set({ selectedContact: null }),
    clearError: () => set({ error: null }),
}));

// Selector hooks
export const useContacts = () => useContactsStore((state) => state.contacts);
export const useSelectedContact = () =>
    useContactsStore((state) => state.selectedContact);
export const useContactsPagination = () =>
    useContactsStore((state) => state.pagination);
export const useContactsLoading = () =>
    useContactsStore((state) => state.isLoading);
export const useContactsError = () => useContactsStore((state) => state.error);
