import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ulumfr - Software Developer',
    description: 'Portfolio website with Next.js',
};

export const revalidate = 3600;

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
