'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useStores } from '@/shared/hooks/use-stores';
import { useRouter } from 'next/navigation';

export function AuthGuard({ children }: { children: ReactNode }) {
    const rootStore = useStores();
    const { user, isInitialized } = rootStore.userStore.state;

    const pathname = usePathname();
    const router = useRouter();

    const publicPaths = ['/login', '/sign-up', '/'];

    useEffect(() => {
        if (!isInitialized || !pathname) {
            return;
        }
        const isPublicPath = publicPaths.includes(pathname);
        if (!user && !isPublicPath) {
            router.replace('/login');
        }
    }, [user, isInitialized]);

    if (!isInitialized) {
        return null;
    }

    return children;
}
