import { Landing } from '@/pages/landing';
import Script from 'next/script';

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

export default function Page() {
    return (
        <>
            <Script
                id="schema-org-main"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaOrg).replace(/</g, '\\u003c'),
                }}
            />
            <Landing />
        </>
    );
}
