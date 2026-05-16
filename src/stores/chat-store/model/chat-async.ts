import { RootStore } from '@/stores';
import { ChatState } from './chat-state';
import { ChatSync } from './chat-sync';
import { createChat, deleteChat, getChats, renameChat } from '@/entities/chat/api';
import { runInAction } from 'mobx';

export class ChatAsync {
    constructor(
        public root: RootStore,
        public state: ChatState,
        public sync: ChatSync,
    ) {}

    async loadChats() {
        const chats = await this.root.settingsStore.async.run(
            'chats/loadChats',
            getChats,
        );

        runInAction(() => {
            this.state.chats = chats;
        });
    }

    async addChat(title: string) {
        const chat = await this.root.settingsStore.async.run('chats/addChat', () =>
            createChat(title),
        );

        runInAction(() => {
            this.state.chats.unshift(chat);
        });

        return chat;
    }

    async deleteChat(chatId: number) {
        await this.root.settingsStore.async.run('chats/deleteChat', () =>
            deleteChat(chatId),
        );

        runInAction(() => {
            this.state.chats = this.state.chats.filter((c) => c.id !== chatId);
        });
    }

    async renameChat(chatId: number, title: string) {
        await this.root.settingsStore.async.run('chats/renameChat', () =>
            renameChat(chatId, title),
        );

        runInAction(() => {
            const chat = this.state.chats.find((c) => c.id === chatId);
            if (chat) {
                chat.title = title;
            }
        });
    }
}
