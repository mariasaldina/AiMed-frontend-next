import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useStores } from '@/shared/hooks/use-stores';

export const useLoadMessages = (chatId: number | null) => {
    const router = useRouter();
    const rootStore = useStores();

    useEffect(() => {
        rootStore.messageStore.sync.resetMessages();

        if (!chatId) {
            return;
        }

        const loadMessages = async () => {
            rootStore.messageStore.async.loadMessages(chatId).catch((err) => {
                if (axios.isAxiosError(err) && err.response?.status === 404) {
                    router.push('/chats');
                }
            });
        };

        loadMessages();
    }, [chatId]);
};
