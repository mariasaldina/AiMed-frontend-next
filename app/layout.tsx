import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'dayjs/locale/ru';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import { StoreProvider } from '../src/app/providers/StoreProvider';
import UserInitializer from '../src/app/providers/UserInitializer';
import AuthWrapper from '@/widgets/auth-wrapper/AuthWrapper';
import theme from '../src/shared/config/theme/mantine-theme';
import CommonWrapper from '@/widgets/common-wrapper/CommonWrapper';
import { globalMetadata } from '@/shared/config/seo/global';

export const metadata = globalMetadata;

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
