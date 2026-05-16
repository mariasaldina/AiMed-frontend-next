import { RootStore } from '..';
import { MessageState } from './model/message-state';
import { MessageSync } from './model/message-sync';
import { MessageAsync } from './model/message-async';

export class MessageStore {
    state: MessageState;
    sync: MessageSync;
    async: MessageAsync;

    constructor(public root: RootStore) {
        this.state = new MessageState(root);
        this.sync = new MessageSync(root, this.state);
        this.async = new MessageAsync(root, this.state, this.sync);
    }
}
