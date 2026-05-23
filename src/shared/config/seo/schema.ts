export const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AiMed',
    url: 'http://localhost:3000',
    description:
        'Чат с медицинским ИИ-ассистентом, анализ симптомов и подбор врачей',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'All',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'RUB',
    },
    image: `'http://localhost:3000'/AiMed.png`,
};
