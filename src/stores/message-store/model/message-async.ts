import { getMessages } from '@/entities/message/api';
import { runInAction } from 'mobx';
import { RootStore } from '@/stores';
import { MessageSync } from './message-sync';
import { MessageState } from './message-state';
import { sendMessage } from '@/features/send-message/api';
import { findDoctorsApi } from '@/features/find-doctors/api';

export class MessageAsync {
    constructor(
        public root: RootStore,
        public state: MessageState,
        public sync: MessageSync,
    ) {}

    async loadMessages(chatId: number | null) {
        if (!chatId) {
            return;
        }

        const before =
            this.state.messages.length !== 0
                ? this.state.messages[0].createdAt
                : '';
        const { messages, hasMore } = await this.root.settingsStore.async.run(
            'chatMessages/loadMessages',
            () => getMessages(chatId, before, 3),
        );

        runInAction(() => {
            const existing = new Set(this.state.messages.map((m) => m.id));
            const filtered = messages.filter((m) => !existing.has(m.id));
            this.state.messages.unshift(...filtered);
            this.state.hasMore = hasMore;
        });
    }

    async sendMessage(content: string, chatId: number, tempId: string) {
        const { userMessage, assistantMessage } =
            await this.root.settingsStore.async.run(
                'chatMessages/sendMessage',
                () => sendMessage(content, chatId),
            );

        runInAction(() => {
            this.root.chatStore.sync.moveToTop(chatId);
            this.state.messages = this.state.messages.flatMap((m) =>
                m.id === tempId ? [userMessage, assistantMessage] : [m],
            );
        });
    }

    async sendMessageNonOptimistic(content: string, chatId: number) {
        const { userMessage, assistantMessage } =
            await this.root.settingsStore.async.run(
                'chatMessages/sendMessage',
                () => sendMessage(content, chatId),
            );

        runInAction(() => {
            this.root.chatStore.sync.moveToTop(chatId);
            this.state.messages.push(userMessage, assistantMessage);
        });
    }

    async findDoctors(chatId: number) {
        const message = await this.root.settingsStore.async.run(
            'chatMessages/findDoctors',
            () => findDoctorsApi(chatId),
        );

        runInAction(() => {
            this.root.chatStore.sync.moveToTop(chatId);
            this.state.messages.push(message);
        });
    }
}
