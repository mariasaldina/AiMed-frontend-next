'use client';

import { RootWrapper } from '@/widgets/root-wrapper';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const dashboardMetadata: Metadata = {
    robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: ReactNode }) {
    return <RootWrapper>{children}</RootWrapper>;
}
