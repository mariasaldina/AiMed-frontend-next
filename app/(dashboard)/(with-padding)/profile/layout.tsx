import { EditableLayout } from '@/pages/profile';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return <EditableLayout>{children}</EditableLayout>;
}
