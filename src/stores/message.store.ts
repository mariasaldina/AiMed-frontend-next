import { Message } from '@/entities/message/model/message.types';
import { RootStore } from '.';
import { getMessages } from '@/entities/message/api';
import { makeAutoObservable, runInAction } from 'mobx';
import { findDoctorsApi, sendMessage } from '@/features/chat/api';

export class MessageStore {
    root: RootStore;

    messages: Message[] = [];
    hasMore: boolean = true;

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

    resetMessages() {
        this.messages = [];
        this.hasMore = true;
    }

    setMessages(messages: Message[]) {
        this.messages = messages;
    }

    addMessage(message: Message) {
        this.messages.push(message);
    }

    async loadMessages(chatId: number | null) {
        if (!chatId) {
            return;
        }

        const before =
            this.messages.length !== 0 ? this.messages[0].createdAt : '';
        const { messages, hasMore } = await this.root.settingsStore.run(
            'chatMessages/loadMessages',
            () => getMessages(chatId, before, 3),
        );

        runInAction(() => {
            const existing = new Set(this.messages.map((m) => m.id));
            const filtered = messages.filter((m) => !existing.has(m.id));
            this.messages.unshift(...filtered);
            this.hasMore = hasMore;
        });
    }

    async sendMessage(content: string, chatId: number, tempId: string) {
        const { userMessage, assistantMessage } =
            await this.root.settingsStore.run('chatMessages/sendMessage', () =>
                sendMessage(content, chatId),
            );

        runInAction(() => {
            this.root.chatStore.moveToTop(chatId);
            this.messages = this.messages.flatMap((m) =>
                m.id === tempId ? [userMessage, assistantMessage] : [m],
            );
        });
    }

    async sendMessageNonOptimistic(content: string, chatId: number) {
        const { userMessage, assistantMessage } =
            await this.root.settingsStore.run('chatMessages/sendMessage', () =>
                sendMessage(content, chatId),
            );

        runInAction(() => {
            this.root.chatStore.moveToTop(chatId);
            this.messages.push(userMessage, assistantMessage);
        });
    }

    async findDoctors(chatId: number) {
        const message = await this.root.settingsStore.run(
            'chatMessages/findDoctors',
            () => findDoctorsApi(chatId),
        );

        runInAction(() => {
            this.root.chatStore.moveToTop(chatId);
            this.messages.push(message);
        });
    }
}
