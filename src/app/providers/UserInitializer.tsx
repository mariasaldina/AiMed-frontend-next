'use client';

import { ReactNode, useEffect } from 'react';
import { useStores } from './StoreProvider';

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
