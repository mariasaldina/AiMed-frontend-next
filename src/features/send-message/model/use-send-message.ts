import { useStores } from '@/shared/hooks/use-stores';
import { Message } from '@/entities/message/model/types';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const useSendMessage = (
    chatId: number | null | undefined,
    content: string,
    setContent: (newContent: string) => void,
) => {
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
        rootStore.messageStore.sync.addMessage(tempUserMessage);
        setContent('');

        try {
            await rootStore.messageStore.async.sendMessage(
                content,
                chatId,
                tempId,
            );
        } catch (e) {
            console.log(e);
        }
    };

    const handleSend = async () => {
        if (!chatId) {
            const chat = await rootStore.chatStore.async.addChat('Новый чат');

            if (!chat) return;

            try {
                await rootStore.messageStore.async.sendMessageNonOptimistic(
                    content,
                    chat.id,
                );
                router.push(`/chats/${chat.id}`);
            } catch (e) {
                console.log(e);
            }

            return;
        }

        try {
            await sendMessage(chatId);
        } catch (e) {
            console.log(e);
        }
    };

    return handleSend;
};

export default useSendMessage;
