import { mantineHtmlProps } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'dayjs/locale/ru';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import { Metadata } from 'next';
import AppProviders from '@/app/providers/AppProviders';
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
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
    manifest: '/manifest.json',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html {...mantineHtmlProps}>
            <body>
                <NextIntlClientProvider>
                    <AppProviders>{children}</AppProviders>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
