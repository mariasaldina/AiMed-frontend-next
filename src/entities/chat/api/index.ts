import { api } from '@/shared/api';
import { Chat } from '@/entities/chat/model/chat.types';
import axios from 'axios';
import { ChatRoutes } from './routes';

export const getChats = async () => {
    try {
        const { data } = await api.get<Chat[]>(ChatRoutes.GET_CHATS);
        return data;
    } catch (e) {
        throw new Error('Ошибка загрузки чатов');
    }
};

export const createChat = async (title: string) => {
    try {
        const { data } = await api.post<Chat>(ChatRoutes.CREATE_CHAT, {
            title,
        });
        return data;
    } catch (e) {
        throw new Error('Ошибка создания чата');
    }
};

export const deleteChat = async (chatId: number): Promise<void> => {
    try {
        await api.delete(ChatRoutes.DELETE_CHAT(chatId));
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 404) {
                throw new Error('Такого чата не существует');
            }
        }
        throw new Error('Ошибка удаления чата');
    }
};

export const renameChat = async (
    chatId: number,
    title: string,
): Promise<void> => {
    try {
        await api.patch(ChatRoutes.RENAME_CHAT(chatId), { title });
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 404) {
                throw new Error('Такого чата не существует');
            }
        }
        throw new Error('Ошибка при попытке переименовать чат');
    }
};
