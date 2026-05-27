import { ReactNode } from 'react';
import { Metadata } from 'next';
import { RootWrapper } from '@/widgets/root-wrapper';

export const metadata: Metadata = {
    robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: ReactNode }) {
    return <RootWrapper>{children}</RootWrapper>;
}
