'use client';

import { useStores } from '@/shared/hooks/use-stores';
import { ReactNode, useEffect } from 'react';

export default function UserInitializer({ children }: { children: ReactNode }) {
    const store = useStores();

    useEffect(() => {
        const loadUser = async () => {
            store?.userStore.async.setUser();
        };
        loadUser();
    }, []);

    return children;
}
