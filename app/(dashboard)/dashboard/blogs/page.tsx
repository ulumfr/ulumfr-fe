"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BlogList } from "@/components/blogs/blog-list";
import { BlogFormDialog } from "@/components/blogs/blog-form-dialog";
import { useBlogs } from "@/hooks/use-blogs";

export default function BlogsPage() {
    const [page, setPage] = useState(1);
    const limit = 9;

    const {
        blogs,
        pagination,
        isLoading,
        createBlog,
        updateBlog,
        deleteBlog,
    } = useBlogs({ page, limit });

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
                        title="Blogs"
                        description="Manage your blog posts"
                        actions={<BlogFormDialog onSubmit={createBlog} />}
                    />
                    <div className="px-4 md:px-6">
                        <BlogList
                            blogs={blogs}
                            isLoading={isLoading}
                            pagination={pagination}
                            onPageChange={setPage}
                            onCreate={createBlog}
                            onUpdate={updateBlog}
                            onDelete={deleteBlog}
                        />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
