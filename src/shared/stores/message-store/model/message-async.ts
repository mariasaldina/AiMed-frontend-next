import { getMessages } from '@/entities/message/api';
import { runInAction } from 'mobx';
import { RootStore } from '@/shared/stores';
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

        try {
            this.root.settingsStore.sync.startLoading(
                'chatMessages/loadMessages',
            );
            const before =
                this.state.messages.length !== 0
                    ? this.state.messages[0].createdAt
                    : '';
            const { messages, hasMore } = await getMessages(chatId, before, 3);

            runInAction(() => {
                const existing = new Set(this.state.messages.map((m) => m.id));
                const filtered = messages.filter((m) => !existing.has(m.id));
                this.state.messages.unshift(...filtered);
                this.state.hasMore = hasMore;
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
            throw e;
        } finally {
            this.root.settingsStore.sync.stopLoading(
                'chatMessages/loadMessages',
            );
        }
    }

    async sendMessage(content: string, chatId: number, tempId: string) {
        try {
            this.root.settingsStore.sync.startLoading(
                'chatMessages/sendMessage',
            );
            const { userMessage, assistantMessage } = await sendMessage(
                content,
                chatId,
            );

            runInAction(() => {
                this.root.chatStore.sync.moveToTop(chatId);
                this.state.messages = this.state.messages.flatMap((m) =>
                    m.id === tempId ? [userMessage, assistantMessage] : [m],
                );
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
            throw e;
        } finally {
            this.root.settingsStore.sync.stopLoading(
                'chatMessages/sendMessage',
            );
        }
    }

    async sendMessageNonOptimistic(content: string, chatId: number) {
        try {
            this.root.settingsStore.sync.startLoading(
                'chatMessages/sendMessageNonOptimistic',
            );
            const { userMessage, assistantMessage } = await sendMessage(
                content,
                chatId,
            );

            runInAction(() => {
                this.root.chatStore.sync.moveToTop(chatId);
                this.state.messages.push(userMessage, assistantMessage);
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
            throw e;
        } finally {
            this.root.settingsStore.sync.stopLoading(
                'chatMessages/sendMessageNonOptimistic',
            );
        }
    }

    async findDoctors(chatId: number) {
        try {
            this.root.settingsStore.sync.startLoading(
                'chatMessages/findDoctors',
            );
            const message = await findDoctorsApi(chatId);

            runInAction(() => {
                this.root.chatStore.sync.moveToTop(chatId);
                this.state.messages.push(message);
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
            throw e;
        } finally {
            this.root.settingsStore.sync.stopLoading(
                'chatMessages/findDoctors',
            );
        }
    }
}
