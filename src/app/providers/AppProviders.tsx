'use client';

import { MantineProvider } from '@mantine/core';
import StoreProvider from '@/app/providers/StoreProvider';
import UserInitializer from '@/app/providers/UserInitializer';
import theme from '@/shared/config/mantine-theme';
import { AuthWrapper } from '@/widgets/auth-wrapper';
import { CommonWrapper } from '@/widgets/common-wrapper';

export default function AppProviders({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MantineProvider theme={theme} defaultColorScheme="auto">
            <StoreProvider>
                <UserInitializer>
                    <CommonWrapper>
                        <AuthWrapper>{children}</AuthWrapper>
                    </CommonWrapper>
                </UserInitializer>
            </StoreProvider>
        </MantineProvider>
    );
}
