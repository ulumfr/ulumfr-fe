"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ResumeList } from "@/features/resumes/components/resume-list";
import { ResumeUploadDialog } from "@/features/resumes/components/resume-upload-dialog";
import { useResumes } from "@/features/resumes/hooks/use-resumes";

export default function ResumesPage() {
    const {
        resumes,
        isLoading,
        isUploading,
        activateResume,
        deleteResume,
        uploadAndCreateResume,
    } = useResumes();

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
                        title="Resumes"
                        description="Manage your CV and resume files"
                        actions={
                            <ResumeUploadDialog
                                isUploading={isUploading}
                                onUpload={uploadAndCreateResume}
                            />
                        }
                    />
                    <div className="px-4 md:px-6">
                        <ResumeList
                            resumes={resumes}
                            isLoading={isLoading}
                            onActivate={activateResume}
                            onDelete={deleteResume}
                        />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
