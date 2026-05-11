'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useStores } from '@/app/providers/StoreProvider';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';

function AuthWrapper({ children }: { children: ReactNode }) {
    const rootStore = useStores();
    const { user, isInitialized } = rootStore.userStore;

    const pathname = usePathname();
    const router = useRouter();

    const publicPaths = ['/login', '/sign-up', '/'];

    useEffect(() => {
        if (!isInitialized) {
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

export default observer(AuthWrapper);
