import { RootStore } from '@/stores';
import { ChatState } from './chat-state';
import { makeAutoObservable } from 'mobx';

export class ChatSync {
    constructor(
        public root: RootStore,
        public state: ChatState,
    ) {
        makeAutoObservable(this);
    }

    moveToTop(chatId: number) {
        const index = this.state.chats.findIndex((c) => c.id === chatId);
        if (index !== -1) {
            const [chat] = this.state.chats.splice(index, 1);
            this.state.chats.unshift(chat);
        }
    }
}
