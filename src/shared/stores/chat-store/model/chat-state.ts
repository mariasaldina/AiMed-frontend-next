import { Chat } from '@/entities/chat/model/types';
import { RootStore } from '@/shared/stores';
import { makeAutoObservable } from 'mobx';

export class ChatState {
    chats: Chat[] = [];

    constructor(public root: RootStore) {
        makeAutoObservable(this);
    }
}
