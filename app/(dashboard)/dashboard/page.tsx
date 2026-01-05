"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useProjects } from "@/hooks/use-projects";
import { useCategories } from "@/hooks/use-categories";
import { useTags } from "@/hooks/use-tags";
import { useCareers } from "@/hooks/use-careers";
import { useContacts } from "@/hooks/use-contacts";
import { format } from "date-fns";
import { Mail, MailOpen } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const { projects } = useProjects();
  const { categories } = useCategories();
  const { tags } = useTags();
  const { careers } = useCareers();
  const { contacts, isLoading: contactsLoading } = useContacts();

  const stats = {
    totalProjects: projects.length,
    totalTags: tags.length,
    totalCategories: categories.length,
    totalCareers: careers.length,
  };

  // Get the 5 most recent contacts
  const recentContacts = contacts.slice(0, 5);

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
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards stats={stats} />
              {/* Recent Contacts Table */}
              <div className="px-4 lg:px-6">
                <div className="rounded-xl border bg-card p-6">
                  <h2 className="text-lg font-semibold mb-4">Recent Contacts</h2>
                  {contactsLoading ? (
                    <p className="text-muted-foreground text-sm">Loading...</p>
                  ) : recentContacts.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      No contacts yet. Messages from your contact form will appear here.
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[40px]"></TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentContacts.map((contact) => (
                          <TableRow key={contact.id}>
                            <TableCell>
                              {contact.is_read ? (
                                <MailOpen className="size-4 text-muted-foreground" />
                              ) : (
                                <Mail className="size-4 text-primary" />
                              )}
                            </TableCell>
                            <TableCell className="font-medium">
                              {contact.name}
                              {!contact.is_read && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  New
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {contact.subject || "-"}
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground">
                              {format(new Date(contact.created_at), "MMM d, yyyy")}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
