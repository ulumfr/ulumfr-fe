"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ProjectList } from "@/components/projects/project-list";
import { ProjectFormDialog } from "@/components/projects/project-form-dialog";
import { useProjects } from "@/hooks/use-projects";
import { useCategories } from "@/hooks/use-categories";
import { useTags } from "@/hooks/use-tags";

export default function ProjectsPage() {
    const {
        projects,
        isLoading,
        createProject,
        updateProject,
        deleteProject,
    } = useProjects();

    const { categories } = useCategories();
    const { tags } = useTags();

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
                        title="Projects"
                        description="Manage your portfolio projects"
                        actions={
                            <ProjectFormDialog
                                categories={categories}
                                tags={tags}
                                onSubmit={createProject}
                            />
                        }
                    />
                    <div className="px-4 md:px-6">
                        <ProjectList
                            projects={projects}
                            categories={categories}
                            tags={tags}
                            isLoading={isLoading}
                            onUpdate={updateProject}
                            onDelete={deleteProject}
                        />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
