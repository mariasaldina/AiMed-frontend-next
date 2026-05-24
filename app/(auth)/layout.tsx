'use client';

import { PublicWrapper } from '@/widgets/public-wrapper';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const authMetadata: Metadata = {
    robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: ReactNode }) {
    return <PublicWrapper>{children}</PublicWrapper>;
}
