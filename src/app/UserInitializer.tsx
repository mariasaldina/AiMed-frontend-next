'use client';

import { ReactNode, useEffect } from 'react';
import { useStores } from './providers/StoreProvider';

export default function UserInitializer({ children }: { children: ReactNode }) {
    const store = useStores();

    useEffect(() => {
        const loadUser = async () => {
            store?.userStore.setUser();
        };
        loadUser();
    }, []);

    return children;
}
