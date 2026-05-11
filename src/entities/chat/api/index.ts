import { api } from '@/shared/api';
import { Chat } from '@/entities/chat/model/chat.types';
import axios from 'axios';

export const getChats = async () => {
    try {
        const { data } = await api.get<Chat[]>('/chat');
        return data;
    } catch (e) {
        throw 'Ошибка загрузки чатов';
    }
};

export const createChat = async (title: string) => {
    try {
        const { data } = await api.post<Chat>('/chat', { title });
        return data;
    } catch (e) {
        throw 'Ошибка создания чата';
    }
};

export const deleteChat = async (chatId: number): Promise<void> => {
    try {
        await api.delete(`/chat/${chatId}`);
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 404) {
                throw 'Такого чата не существует';
            }
        }
        throw 'Ошибка удаления чата';
    }
};

export const renameChat = async (
    chatId: number,
    title: string,
): Promise<void> => {
    try {
        await api.patch(`/chat/${chatId}`, { title });
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 404) {
                throw 'Такого чата не существует';
            }
        }
        throw 'Ошибка при попытке переименовать чат';
    }
};
