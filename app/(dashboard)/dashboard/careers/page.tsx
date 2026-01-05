"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CareerList } from "@/components/careers/career-list";
import { CareerFormDialog } from "@/components/careers/career-form-dialog";
import { useCareers } from "@/hooks/use-careers";

export default function CareersPage() {
    const {
        careers,
        isLoading,
        createCareer,
        updateCareer,
        deleteCareer,
    } = useCareers();

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
                        title="Work Experience"
                        description="Manage your career history"
                        actions={<CareerFormDialog onSubmit={createCareer} />}
                    />
                    <div className="px-4 md:px-6">
                        <CareerList
                            careers={careers}
                            isLoading={isLoading}
                            onCreate={createCareer}
                            onUpdate={updateCareer}
                            onDelete={deleteCareer}
                        />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
