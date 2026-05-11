import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '.';
import { Chat } from '@/entities/chat/model/chat.types';
import {
    createChat,
    deleteChat,
    getChats,
    renameChat,
} from '@/entities/chat/api';

export class ChatStore {
    root: RootStore;
    chats: Chat[] = [];

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

    moveToTop(chatId: number) {
        const index = this.chats.findIndex((c) => c.id === chatId);
        if (index !== -1) {
            const [chat] = this.chats.splice(index, 1);
            this.chats.unshift(chat);
        }
    }

    async loadChats() {
        const chats = await this.root.settingsStore.run(
            'chats/getChats',
            getChats,
        );

        runInAction(() => {
            this.chats = chats;
        });
    }

    async addChat(title: string) {
        const chat = await this.root.settingsStore.run('chats/addChat', () =>
            createChat(title),
        );

        runInAction(() => {
            this.chats.unshift(chat);
        });

        return chat;
    }

    async deleteChat(chatId: number) {
        await this.root.settingsStore.run('chats/deleteChat', () =>
            deleteChat(chatId),
        );

        runInAction(() => {
            this.chats = this.chats.filter((c) => c.id !== chatId);
        });
    }

    async renameChat(chatId: number, title: string) {
        await this.root.settingsStore.run('chats/renameChat', () =>
            renameChat(chatId, title),
        );

        runInAction(() => {
            const chat = this.chats.find((c) => c.id === chatId);
            if (chat) {
                chat.title = title;
            }
        });
    }
}
