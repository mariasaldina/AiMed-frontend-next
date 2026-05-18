'use client';

import { useStores } from '@/app/providers/StoreProvider';
import { Metadata } from 'next';
import { ReactNode, useEffect } from 'react';

export const chatsMetadata: Metadata = {
    title: 'Чат',
    description: 'Чат с медицинским ИИ-ассистентом',
};

export default function ChatLayout({ children }: { children: ReactNode }) {
    const rootStore = useStores();

    useEffect(() => {
        rootStore.chatStore.async.loadChats().catch((e) => console.log(e));
    }, []);

    return children;
}
