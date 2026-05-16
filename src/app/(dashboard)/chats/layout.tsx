'use client';

import { useStores } from '@/app/providers/StoreProvider';
import { ReactNode, useEffect } from 'react';

export default function ChatLayout({ children }: { children: ReactNode }) {
    const rootStore = useStores();

    useEffect(() => {
        rootStore.chatStore.async.loadChats();
    }, []);

    return children;
}
