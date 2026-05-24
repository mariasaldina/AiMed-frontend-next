'use client';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'dayjs/locale/ru';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import { StoreProvider } from '@/app/providers/StoreProvider';
import UserInitializer from '@/app/providers/UserInitializer';
import theme from '@/shared/config/mantine-theme';
import { Metadata } from 'next';
import { AuthWrapper } from '@/widgets/auth-wrapper';
import { CommonWrapper } from '@/widgets/common-wrapper';

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body>
                <MantineProvider theme={theme}>
                    <StoreProvider>
                        <UserInitializer>
                            <CommonWrapper>
                                <AuthWrapper>{children}</AuthWrapper>
                            </CommonWrapper>
                        </UserInitializer>
                    </StoreProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
