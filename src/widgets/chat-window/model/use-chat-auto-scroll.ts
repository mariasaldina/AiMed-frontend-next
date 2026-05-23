import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useStores } from '@/shared/hooks/use-stores';

export const useChatAutoScroll = (
    chatId: number | null,
    scrollableRef: React.RefObject<HTMLDivElement | null>,
    sending: boolean,
) => {
    const rootStore = useStores();
    const { messages } = rootStore.messageStore.state;

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
