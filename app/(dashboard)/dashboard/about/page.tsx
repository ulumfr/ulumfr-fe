"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AboutList } from "@/components/about/about-list";
import { AboutFormDialog } from "@/components/about/about-form-dialog";
import { useAbout } from "@/hooks/use-about";

export default function AboutPage() {
    const {
        aboutList,
        isLoading,
        createAbout,
        updateAbout,
        deleteAbout,
    } = useAbout();

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
                        title="About / Profile"
                        description="Manage your profile information"
                        actions={<AboutFormDialog onSubmit={createAbout} />}
                    />
                    <div className="px-4 md:px-6">
                        <AboutList
                            aboutList={aboutList}
                            isLoading={isLoading}
                            onCreate={createAbout}
                            onUpdate={updateAbout}
                            onDelete={deleteAbout}
                        />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
