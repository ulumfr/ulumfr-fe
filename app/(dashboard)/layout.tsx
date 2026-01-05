import type { Metadata } from "next";
import { AdminGuard } from "@/components/admin-guard";

export const metadata: Metadata = {
  title: "Dashboard | Ulumfr",
  description: "Admin dashboard untuk mengelola portfolio CMS.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminGuard>{children}</AdminGuard>;
}
