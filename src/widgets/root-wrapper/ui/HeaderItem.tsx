'use client';

import { ActionIcon, Button, useMatches } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface HeaderItemProps {
    to: string;
    icon: ReactNode;
    label: string;
}

function HeaderItem({ to, icon, label }: HeaderItemProps) {
    const isMobile = useMatches({ base: true, md: false });
    const pathname = usePathname();
    const isActive = pathname === to;

    if (!isMobile)
        return (
            <Button
                component={Link}
                href={to}
                variant={!isActive ? 'subtle' : 'filled'}
                leftSection={icon}
                h="100%"
                bdrs={0}
            >
                {label}
            </Button>
        );

    return (
        <ActionIcon
            component={Link}
            href={to}
            variant={!isActive ? 'subtle' : 'filled'}
            h="100%"
            w={60}
            bdrs={0}
        >
            {icon}
        </ActionIcon>
    );
}

export default HeaderItem;
