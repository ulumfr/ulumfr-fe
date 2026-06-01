import type { Metadata } from 'next';
import ScrollToTop from '@/components/portfolio/scroll-to-top';
import AIModal from '@/components/portfolio/ai-modal';

export const metadata: Metadata = {
    metadataBase: new URL('https://www.ulumfr.my.id'),
    alternates: {
        canonical: '/',
    },
    title: {
        default: 'Ulumfr — Full Stack Developer',
        template: '%s | Ulumfr',
    },
    description: 'Portfolio of Bahrul Ulum Fadhlur Rohman — Full Stack Developer specializing in building modern, scalable web applications with Next.js, Go, Laravel, and cloud technologies.',
    keywords: [
        'full stack developer',
        'web developer',
        'software engineer',
        'portfolio',
        'bahrul ulum',
        'ulumfr',
        'next.js',
        'golang',
        'go developer',
        'laravel developer',
        'indonesia web developer'
    ],
    authors: [{ name: 'Bahrul Ulum Fadhlur Rohman' }],
    creator: 'Bahrul Ulum Fadhlur Rohman',
    openGraph: {
        title: 'Ulumfr — Full Stack Developer',
        description: 'Full Stack Developer specializing in building modern, scalable web applications with Next.js, Go, Laravel, and cloud technologies.',
        type: 'website',
        url: 'https://www.ulumfr.my.id',
        siteName: 'Ulumfr Portfolio',
        images: [
            {
                url: '/icon.png',
                width: 512,
                height: 512,
                alt: 'Bahrul Ulum Logo',
            },
        ],
        locale: 'id_ID',
    },
    twitter: {
        card: 'summary',
        title: 'Ulumfr — Full Stack Developer',
        description: 'Full Stack Developer specializing in building modern, scalable web applications with Next.js, Go, Laravel, and cloud technologies.',
        images: ['/icon.png'],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export const revalidate = 3600;

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Bahrul Ulum Fadhlur Rohman",
        "alternateName": "Ulumfr",
        "url": "https://www.ulumfr.my.id",
        "image": "https://www.ulumfr.my.id/icon.png",
        "sameAs": [
            "https://github.com/ulumfr",
            "https://linkedin.com/in/ulumfr",
            "https://instagram.com/ulumfr"
        ],
        "jobTitle": "Full Stack Developer",
        "worksFor": {
            "@type": "Organization",
            "name": "Freelance"
        },
        "description": "Full Stack Developer specializing in building modern, scalable web applications with Next.js, Go, Laravel, and cloud technologies."
    };

    return (
        <div className="scroll-smooth">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
            <ScrollToTop />
            <AIModal />
        </div>
    );
}
