'use client';

import { useStores } from '@/app/providers/StoreProvider';
import { ReactNode, useEffect } from 'react';

export default function ChatListFetcher({ children }: { children: ReactNode }) {
    const rootStore = useStores();

    useEffect(() => {
        rootStore.chatStore.loadChats();
    }, []);

    return children;
}
