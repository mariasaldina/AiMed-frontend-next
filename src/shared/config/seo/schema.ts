import { SEO_CONSTANTS } from './constants';

export const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AiMed',
    url: SEO_CONSTANTS.baseUrl,
    description:
        'Чат с медицинским ИИ-ассистентом, анализ симптомов и подбор врачей',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'All',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'RUB',
    },
    image: `${SEO_CONSTANTS.baseUrl}/AiMed.png`,
};
