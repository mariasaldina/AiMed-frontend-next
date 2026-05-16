'use client';

import ChatNavbar from '@/widgets/chat-navbar/ChatNavbar';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Header from '../header/Header';

export default function AppLayout({ children }: { children: ReactNode }) {
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] =
        useDisclosure(false);

    const pathname = usePathname();
    const withNavbar = pathname.startsWith('/chats');

    return (
        <AppShell
            navbar={
                withNavbar
                    ? {
                          width: {
                              sm: 320,
                          },
                          breakpoint: 'sm',
                          collapsed: {
                              desktop: !desktopOpened,
                              mobile: !mobileOpened,
                          },
                      }
                    : undefined
            }
            header={{ height: 50 }}
            h={'100dvh'}
        >
            <AppShell.Header>
                <Header
                    navbarOpened={desktopOpened}
                    showNavbar={withNavbar}
                    toggleNavbar={() => {
                        toggleDesktop();
                        toggleMobile();
                    }}
                />
            </AppShell.Header>

            {withNavbar && (
                <AppShell.Navbar w={{ base: '75%', sm: 320 }}>
                    <ChatNavbar onSelect={closeMobile} />
                </AppShell.Navbar>
            )}

            <AppShell.Main
                h="100%"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                {children}
            </AppShell.Main>
        </AppShell>
    );
}
