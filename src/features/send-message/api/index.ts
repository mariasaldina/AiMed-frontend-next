import { mapMessage } from '@/entities/message/model/mapper';
import { Message } from '@/entities/message/model/types';
import { api } from '@/shared/api';
import { SendMessageResponseDto } from './dtos';
import { SendMessageRoutes } from './routes';

export const sendMessage = async (
    content: string,
    chatId: number,
): Promise<{
    userMessage: Message;
    assistantMessage: Message;
}> => {
    const { data } = await api.post<SendMessageResponseDto>(
        SendMessageRoutes.SEND_MESSAGE(chatId),
        {
            content,
        },
    );
    return {
        userMessage: mapMessage(data.userMessage),
        assistantMessage: mapMessage(data.assistantMessage),
    };
};
