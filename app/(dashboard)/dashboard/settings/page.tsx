"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ProfileForm } from "@/components/settings/profile-form";

export default function SettingsPage() {
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
                        title="Settings"
                        description="Manage your account settings and profile"
                    />
                    <div className="px-4 md:px-6 pb-6 max-w-3xl">
                        <ProfileForm />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
