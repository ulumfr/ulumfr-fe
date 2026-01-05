"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { EducationList } from "@/components/educations/education-list";
import { EducationFormDialog } from "@/components/educations/education-form-dialog";
import { useEducations } from "@/hooks/use-educations";

export default function EducationsPage() {
    const {
        educations,
        isLoading,
        createEducation,
        updateEducation,
        deleteEducation,
    } = useEducations();

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
                        title="Education"
                        description="Manage your education history"
                        actions={<EducationFormDialog onSubmit={createEducation} />}
                    />
                    <div className="px-4 md:px-6">
                        <EducationList
                            educations={educations}
                            isLoading={isLoading}
                            onCreate={createEducation}
                            onUpdate={updateEducation}
                            onDelete={deleteEducation}
                        />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
