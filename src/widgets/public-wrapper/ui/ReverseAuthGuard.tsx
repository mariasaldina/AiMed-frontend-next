'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useStores } from '@/shared/hooks/use-stores';

export function ReverseAuthGuard({ children }: { children: ReactNode }) {
    const rootStore = useStores();
    const { user } = rootStore.userStore.state;
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace('/');
        }
    }, [user, router]);

    return children;
}
