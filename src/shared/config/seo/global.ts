import { Metadata } from 'next';

export const globalMetadata: Metadata = {
    generator: 'Next.js',
    applicationName: 'AiMed',
    title: {
        default: 'AiMed',
        template: `%s | AiMed`,
    },
    description:
        'Чат с медицинским ИИ-ассистентом, анализ симптомов и подбор врачей',
    icons: {
        icon: '/icon.svg',
    },
    metadataBase: new URL('http://localhost:3000'),
    alternates: {
        canonical: 'http://localhost:3000',
    },
    openGraph: {
        title: 'AiMed',
        description:
            'Спросите о своих симптомах ИИ-ассистента и подберите врача в пару кликов',
        url: 'http://localhost:3000',
        siteName: 'AiMed',
        locale: 'ru_RU',
        type: 'website',
        images: [
            {
                url: '/AiMed.png',
                width: 1200,
                height: 630,
                alt: 'AiMed - Your Smart Medical Assistant',
            },
        ],
    },
};
