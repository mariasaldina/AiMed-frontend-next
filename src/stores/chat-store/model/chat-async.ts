import { RootStore } from '@/stores';
import { ChatState } from './chat-state';
import { ChatSync } from './chat-sync';
import {
    createChat,
    deleteChat,
    getChats,
    renameChat,
} from '@/entities/chat/api';
import { runInAction } from 'mobx';

export class ChatAsync {
    constructor(
        public root: RootStore,
        public state: ChatState,
        public sync: ChatSync,
    ) {}

    async loadChats() {
        try {
            this.root.settingsStore.sync.startLoading('chats/loadChats');
            const chats = await getChats();

            runInAction(() => {
                this.state.chats = chats;
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
            throw e;
        } finally {
            this.root.settingsStore.sync.stopLoading('chats/loadChats');
        }
    }

    async addChat(title: string) {
        try {
            this.root.settingsStore.sync.startLoading('chats/addChat');
            const chat = await createChat(title);

            runInAction(() => {
                this.state.chats.unshift(chat);
            });

            return chat;
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
            throw e;
        } finally {
            this.root.settingsStore.sync.stopLoading('chats/addChat');
        }
    }

    async deleteChat(chatId: number) {
        try {
            this.root.settingsStore.sync.startLoading('chats/deleteChat');
            await deleteChat(chatId);

            runInAction(() => {
                this.state.chats = this.state.chats.filter(
                    (c) => c.id !== chatId,
                );
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
            throw e;
        } finally {
            this.root.settingsStore.sync.stopLoading('chats/deleteChat');
        }
    }

    async renameChat(chatId: number, title: string) {
        try {
            this.root.settingsStore.sync.startLoading('chats/renameChat');
            await renameChat(chatId, title);

            runInAction(() => {
                const chat = this.state.chats.find((c) => c.id === chatId);
                if (chat) {
                    chat.title = title;
                }
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
            throw e;
        } finally {
            this.root.settingsStore.sync.stopLoading('chats/renameChat');
        }
    }
}
