import { Metadata } from 'next';
import { SEO_CONSTANTS } from './constants';

export const globalMetadata: Metadata = {
    generator: SEO_CONSTANTS.generator,
    applicationName: SEO_CONSTANTS.shortName,
    title: {
        default: SEO_CONSTANTS.shortName,
        template: `%s | ${SEO_CONSTANTS.shortName}`,
    },
    description: 'Чат с медицинским ИИ-ассистентом, анализ симптомов и подбор врачей',
    icons: {
        icon: SEO_CONSTANTS.favicon,
    },
    metadataBase: new URL(SEO_CONSTANTS.baseUrl),
    alternates: {
        canonical: SEO_CONSTANTS.baseUrl,
    },
    openGraph: {
        title: SEO_CONSTANTS.shortName,
        description: 'Спросите о своих симптомах ИИ-ассистента и подберите врача в пару кликов',
        url: SEO_CONSTANTS.baseUrl,
        siteName: SEO_CONSTANTS.shortName,
        locale: 'ru_RU',
        type: 'website',
        images: [
            {
                url: '/AiMed.png',
                width: 1200,
                height: 630,
                alt: SEO_CONSTANTS.name,
            },
        ],
    },
};
