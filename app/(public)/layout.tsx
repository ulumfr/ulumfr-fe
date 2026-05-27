import type { Metadata } from 'next';
import ScrollToTop from '@/components/portfolio/scroll-to-top';
import AIModal from '@/components/portfolio/ai-modal';

export const metadata: Metadata = {
    title: 'Bahrul Ulum — Full Stack Developer',
    description: 'Portfolio of Bahrul Ulum Fadhlur Rohman — Full Stack Developer specializing in building modern, scalable web applications with Next.js, Go, Laravel, and cloud technologies.',
    keywords: ['full stack developer', 'web developer', 'portfolio', 'bahrul ulum', 'ulumfr', 'next.js', 'go', 'laravel'],
    openGraph: {
        title: 'Bahrul Ulum — Full Stack Developer',
        description: 'Full Stack Developer specializing in modern web applications.',
        type: 'website',
        url: 'https://ulumfr.my.id',
    },
};

export const revalidate = 3600;

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="scroll-smooth">
            {children}
            <ScrollToTop />
            <AIModal />
        </div>
    );
}
