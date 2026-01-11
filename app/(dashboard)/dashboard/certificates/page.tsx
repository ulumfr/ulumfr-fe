"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/page-header";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CertificateList } from "@/components/certificates/certificate-list";
import { CertificateFormDialog } from "@/components/certificates/certificate-form-dialog";
import { useCertificates } from "@/hooks/use-certificates";

export default function CertificatesPage() {
    const {
        certificates,
        isLoading,
        createCertificate,
        updateCertificate,
        deleteCertificate,
    } = useCertificates();

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
                        title="Certificates"
                        description="Manage your professional certificates"
                        actions={<CertificateFormDialog onSubmit={createCertificate} />}
                    />
                    <div className="px-4 md:px-6">
                        <CertificateList
                            certificates={certificates}
                            isLoading={isLoading}
                            onCreate={createCertificate}
                            onUpdate={updateCertificate}
                            onDelete={deleteCertificate}
                        />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
