import React, { useEffect, useLayoutEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useStores } from '@/app/providers/StoreProvider';

export const useChatMessages = (
    chatId: number | null,
    scrollableRef: React.RefObject<HTMLDivElement | null>,
    sending: boolean,
) => {
    const router = useRouter();

    const rootStore = useStores();
    const { messages } = rootStore.messageStore;

    useEffect(() => {
        rootStore.messageStore.resetMessages();

        if (!chatId) {
            return;
        }

        const loadMessages = async () => {
            rootStore.messageStore.loadMessages(chatId).catch((err) => {
                if (axios.isAxiosError(err) && err.response?.status === 404) {
                    router.push('/chats');
                }
            });
        };

        loadMessages();
    }, [chatId]);

    const initRef = useRef(true);

    useEffect(() => {
        initRef.current = true;
    }, [chatId]);

    useLayoutEffect(() => {
        if (!messages.length) return;
        if (!initRef.current) return;
        const root = scrollableRef.current;
        if (!root) return;

        root.scrollTop = root.scrollHeight;
        initRef.current = false;
    }, [messages.length]);

    useLayoutEffect(() => {
        if (initRef.current) return;
        if (!sending) return;
        const root = scrollableRef.current;
        if (!root) return;

        root.scrollTop = root.scrollHeight;
        initRef.current = false;
    }, [sending]);
};
