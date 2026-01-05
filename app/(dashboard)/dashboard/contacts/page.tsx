"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ContactList } from "@/features/contacts/components/contact-list";
import { useContacts } from "@/features/contacts/hooks/use-contacts";

export default function ContactsPage() {
    const { contacts, isLoading, markAsRead, deleteContact } = useContacts();

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <PageHeader
                        title="Contacts"
                        description="Manage messages from your contact form"
                    />
                    <div className="px-4 md:px-6">
                        <ContactList
                            contacts={contacts}
                            isLoading={isLoading}
                            onMarkAsRead={markAsRead}
                            onDelete={deleteContact}
                        />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
