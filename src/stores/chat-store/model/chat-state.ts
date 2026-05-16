import { Chat } from '@/entities/chat/model/chat.types';
import { RootStore } from '@/stores';
import { makeAutoObservable } from 'mobx';

export class ChatState {
    chats: Chat[] = [];

    constructor(public root: RootStore) {
        makeAutoObservable(this);
    }
}
