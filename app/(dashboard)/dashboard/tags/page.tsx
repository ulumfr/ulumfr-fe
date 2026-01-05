"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TagList } from "@/components/tags/tag-list";
import { TagFormDialog } from "@/components/tags/tag-form-dialog";
import { useTags } from "@/hooks/use-tags";

export default function TagsPage() {
    const {
        tags,
        isLoading,
        createTag,
        updateTag,
        deleteTag,
    } = useTags();

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
                        title="Tags"
                        description="Label your projects with tags"
                        actions={<TagFormDialog onSubmit={createTag} />}
                    />
                    <div className="px-4 md:px-6">
                        <TagList
                            tags={tags}
                            isLoading={isLoading}
                            onUpdate={updateTag}
                            onDelete={deleteTag}
                        />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
