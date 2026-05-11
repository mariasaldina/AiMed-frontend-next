import { useStores } from '@/app/providers/StoreProvider';
import { Message } from '@/entities/message/model/message.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useMessageInput = (chatId: number | null | undefined) => {
    const [content, setContent] = useState('');
    const router = useRouter();

    const rootStore = useStores();

    const sendMessage = async (chatId: number) => {
        if (!content.trim()) return;

        const tempId = uuidv4();
        const tempUserMessage: Message = {
            kind: 'user',
            id: tempId,
            content: content,
            createdAt: String(new Date()),
        };
        rootStore.messageStore.addMessage(tempUserMessage);
        setContent('');

        await rootStore.messageStore.sendMessage(content, chatId, tempId);
    };

    const handleSend = async () => {
        if (!chatId) {
            const chat = await rootStore.chatStore.addChat('Новый чат');

            await rootStore.messageStore.sendMessageNonOptimistic(
                content,
                chat.id,
            );
            router.push(`/chats/${chat.id}`);

            return;
        }

        await sendMessage(chatId);
    };

    const findDoctors = async () => {
        if (!chatId) return;
        await rootStore.messageStore.findDoctors(chatId);
    };

    return {
        content,
        setContent,
        handleSend,
        findDoctors,
    };
};

export default useMessageInput;
