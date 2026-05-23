'use client';

import { useStores } from '@/shared/hooks/use-stores';
import { ReactNode, useEffect } from 'react';

export function ChatLayout({ children }: { children: ReactNode }) {
    const rootStore = useStores();

    useEffect(() => {
        rootStore.chatStore.async.loadChats().catch((e) => console.log(e));
    }, []);

    return children;
}
