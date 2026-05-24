import { api } from '@/shared/api';
import { MessageDto } from '@/shared/api/dtos';
import { mapMessage } from '../model/mapper';
import { MessageRoutes } from './routes';

export const getMessages = async (
    chatId: number | null,
    before: string,
    limit: number,
) => {
    const { data } = await api.get<{
        messages: MessageDto[];
        hasMore: boolean;
    }>(MessageRoutes.GET_MESSAGES(chatId), { params: { before, limit } });
    return {
        messages: data.messages.map((m) => mapMessage(m)),
        hasMore: data.hasMore,
    };
};
