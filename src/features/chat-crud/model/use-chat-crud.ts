import { useStores } from '@/shared/hooks/use-stores';
import { useRouter } from '@/shared/config/i18n/navigation';
import { useState } from 'react';

const useChatCrud = (displayedChat: number | null) => {
    const router = useRouter();
    const [deleted, setDeleted] = useState<number | null>(null);
    const [renamed, setRenamed] = useState<number | null>(null);

    const rootStore = useStores();

    const handleAdd = async (title: string) => {
        try {
            const chat = await rootStore.chatStore.async.addChat(title);
            router.push(`/chats/${chat.id}`);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (chatId: number) => {
        setDeleted(chatId);
        try {
            await rootStore.chatStore.async.deleteChat(chatId);
            if (chatId === displayedChat) {
                router.push('/chats');
            }
        } catch (e) {
            console.log(e);
        } finally {
            setDeleted(null);
        }
    };

    const handleRename = async (title: string, chatId: number) => {
        setRenamed(chatId);
        try {
            await rootStore.chatStore.async.renameChat(chatId, title);
        } catch (e) {
            console.log(e);
        } finally {
            setRenamed(null);
        }
    };

    return {
        deleted,
        renamed,
        handleAdd,
        handleDelete,
        handleRename,
    };
};

export default useChatCrud;
