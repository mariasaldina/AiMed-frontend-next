import { api } from '@/shared/api';
import { MessageDto } from '@/shared/api/contracts/message.dto';
import { mapMessage } from '../model/mapper';

export const getMessages = async (
    chatId: number | null,
    before: string,
    limit: number,
) => {
    const { data } = await api.get<{
        messages: MessageDto[];
        hasMore: boolean;
    }>(`/chat/${chatId}`, { params: { before, limit } });
    return {
        messages: data.messages.map((m) => mapMessage(m)),
        hasMore: data.hasMore,
    };
};
