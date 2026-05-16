import { Message } from '@/entities/message/model/message.types';
import { RootStore } from '@/stores';
import { MessageState } from './message-state';
import { makeAutoObservable } from 'mobx';

export class MessageSync {
    constructor(
        public root: RootStore,
        public state: MessageState,
    ) {
        makeAutoObservable(this);
    }

    resetMessages() {
        this.state.messages = [];
        this.state.hasMore = true;
    }

    setMessages(messages: Message[]) {
        this.state.messages = messages;
    }

    addMessage(message: Message) {
        this.state.messages.push(message);
    }
}
