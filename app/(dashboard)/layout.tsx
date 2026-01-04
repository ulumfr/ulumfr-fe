import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Ulumfr",
  description: "Autentikasi pengguna untuk akses layanan sistem.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
