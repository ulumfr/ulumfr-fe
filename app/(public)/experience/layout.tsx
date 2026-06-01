import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Experience',
    description: 'Explore the professional career history, work experience, and educational background of Bahrul Ulum Fadhlur Rohman.',
    alternates: {
        canonical: '/experience',
    },
    openGraph: {
        title: 'Experience | Bahrul Ulum',
        description: 'Explore the professional career history, work experience, and educational background of Bahrul Ulum Fadhlur Rohman.',
    },
};

export default function ExperienceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
