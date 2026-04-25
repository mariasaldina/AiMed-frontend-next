import { api } from '@/shared/api';
import { Chat } from '@/entities/chat/model/chat.types';

export const getChats = async (): Promise<Chat[]> => {
    const { data } = await api.get<Chat[]>('/chat');
    return data;
};

export const createChat = async (title: string): Promise<Chat> => {
    const { data } = await api.post<Chat>('/chat', { title });
    return data;
};

export const deleteChat = async (chatId: number): Promise<void> => {
    await api.delete(`/chat/${chatId}`);
};

export const renameChat = async (
    chatId: number,
    title: string,
): Promise<void> => {
    await api.patch(`/chat/${chatId}`, { title });
};
