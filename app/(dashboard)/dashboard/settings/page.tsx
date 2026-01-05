import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Settings } from "lucide-react";

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
                        description="Account and profile settings"
                    />
                    <div className="flex flex-1 flex-col items-center justify-center px-4">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="rounded-full bg-muted p-6">
                                <Settings className="size-12 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground max-w-md">
                                Account and profile settings are coming soon. Stay tuned for updates!
                            </p>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
