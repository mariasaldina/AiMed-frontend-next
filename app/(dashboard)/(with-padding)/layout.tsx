import PaddedWrapper from '@/shared/ui/PaddedWrapper';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return <PaddedWrapper>{children}</PaddedWrapper>;
}
