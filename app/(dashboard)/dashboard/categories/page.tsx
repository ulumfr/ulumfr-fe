"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CategoryList } from "@/components/categories/category-list";
import { CategoryFormDialog } from "@/components/categories/category-form-dialog";
import { useCategories } from "@/hooks/use-categories";

export default function CategoriesPage() {
    const {
        categories,
        isLoading,
        createCategory,
        updateCategory,
        deleteCategory,
    } = useCategories();

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
                        title="Categories"
                        description="Organize your projects with categories"
                        actions={<CategoryFormDialog onSubmit={createCategory} />}
                    />
                    <div className="px-4 md:px-6">
                        <CategoryList
                            categories={categories}
                            isLoading={isLoading}
                            onUpdate={updateCategory}
                            onDelete={deleteCategory}
                        />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
