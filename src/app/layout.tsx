import { MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';
import '@mantine/core/styles.css';
import { StoreProvider } from './providers/StoreProvider';
import UserInitializer from './UserInitializer';
import AuthWrapper from '@/widgets/AuthWrapper';

export const metadata: Metadata = {
    title: 'AiMed',
    description: 'Your AI med assistant',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body>
                <MantineProvider>
                    <StoreProvider>
                        <UserInitializer>
                            <AuthWrapper>{children}</AuthWrapper>
                        </UserInitializer>
                    </StoreProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
