import { RootStore } from '..';
import { ChatAsync } from './model/chat-async';
import { ChatState } from './model/chat-state';
import { ChatSync } from './model/chat-sync';

export class ChatStore {
    state: ChatState;
    sync: ChatSync;
    async: ChatAsync;

    constructor(root: RootStore) {
        this.state = new ChatState(root);
        this.sync = new ChatSync(root, this.state);
        this.async = new ChatAsync(root, this.state, this.sync);
    }
}
