import { Message } from '@/entities/message/model/message.types';
import { makeAutoObservable } from 'mobx';
import { RootStore } from '@/stores';

export class MessageState {
    messages: Message[] = [];
    hasMore: boolean = true;

    constructor(public root: RootStore) {
        makeAutoObservable(this);
    }
}
