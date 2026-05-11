'use client';

import { ReactNode, useEffect } from 'react';
import { useStores } from './providers/StoreProvider';
import { getUser } from '@/entities/user/api';

export default function UserInitializer({ children }: { children: ReactNode }) {
    const store = useStores();

    useEffect(() => {
        const loadUser = async () => {
            const user = await getUser();
            store?.userStore.setUser(user);
        };
        loadUser();
    }, []);

    return children;
}
