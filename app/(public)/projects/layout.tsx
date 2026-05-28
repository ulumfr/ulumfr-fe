import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Browse the portfolio projects, web applications, open-source repositories, and experiments built by Bahrul Ulum Fadhlur Rohman.',
    openGraph: {
        title: 'Projects | Bahrul Ulum',
        description: 'Browse the portfolio projects, web applications, open-source repositories, and experiments built by Bahrul Ulum Fadhlur Rohman.',
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
