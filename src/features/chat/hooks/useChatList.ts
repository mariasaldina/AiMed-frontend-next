'use client';

import { useStores } from '@/app/providers/StoreProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useChatList = (
    displayedChat: number | null,
    onChatSelect: () => void,
) => {
    const router = useRouter();
    const [deleted, setDeleted] = useState<number | null>(null);
    const [renamed, setRenamed] = useState<number | null>(null);

    const rootStore = useStores();

    const handleAdd = async (title: string) => {
        const chat = await rootStore.chatStore.addChat(title);
        router.push(`/chats/${chat.id}`);
    };

    const handleDelete = async (chatId: number) => {
        setDeleted(chatId);
        try {
            await rootStore.chatStore.deleteChat(chatId);
            if (chatId === displayedChat) {
                router.push('/chats');
            }
        } catch (e) {
        } finally {
            setDeleted(null);
        }
    };

    const handleRename = async (title: string, chatId: number) => {
        setRenamed(chatId);
        try {
            await rootStore.chatStore.renameChat(chatId, title);
        } catch (e) {
        } finally {
            setRenamed(null);
        }
    };

    const handleSelect = (chatId: number) => {
        onChatSelect();
        router.push(`/chats/${chatId}`);
    };

    return {
        deleted,
        renamed,
        handleAdd,
        handleDelete,
        handleRename,
        handleSelect,
    };
};

export default useChatList;
