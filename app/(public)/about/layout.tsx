import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about Bahrul Ulum Fadhlur Rohman, his tech stack, credentials, and passion for software development.',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About | Bahrul Ulum',
        description: 'Learn more about Bahrul Ulum Fadhlur Rohman, his tech stack, credentials, and passion for software development.',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
