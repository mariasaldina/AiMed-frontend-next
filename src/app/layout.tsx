import { MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';
import '@mantine/core/styles.css';
import { StoreProvider } from './providers/StoreProvider';
import UserInitializer from './providers/UserInitializer';
import AuthWrapper from '@/widgets/auth-wrapper/AuthWrapper';
import theme from './providers/theme';
import CommonWrapper from '@/widgets/common-wrapper/CommonWrapper';
import AppLayout from '@/widgets/app-layout/AppLayout';

export const metadata: Metadata = {
    title: 'AiMed',
    description: 'Your AI med assistant',
    icons: {
        icon: '/icon.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <head></head>
            <body>
                <MantineProvider theme={theme}>
                    <StoreProvider>
                        <UserInitializer>
                            <CommonWrapper>
                                <AuthWrapper>
                                    <AppLayout>{children}</AppLayout>
                                </AuthWrapper>
                            </CommonWrapper>
                        </UserInitializer>
                    </StoreProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
