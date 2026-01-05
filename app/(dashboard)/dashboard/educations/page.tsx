import { AppSidebar } from "@/components/app-sidebar";
import { ComingSoon } from "@/components/coming-soon";
import { PageHeader } from "@/components/page-header";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function EducationsPage() {
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
                    />
                    <ComingSoon
                        title="Education"
                        description="Add schools, degrees, and achievements."
                    />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
