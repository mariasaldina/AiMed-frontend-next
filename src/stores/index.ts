import { UserStore } from '@/stores/user.store';
import { SettingsStore } from './settings.store';
import { ChatStore } from './chat.store';
import { MessageStore } from './message.store';

export class RootStore {
    userStore: UserStore;
    settingsStore: SettingsStore;
    chatStore: ChatStore;
    messageStore: MessageStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.settingsStore = new SettingsStore(this);
        this.chatStore = new ChatStore(this);
        this.messageStore = new MessageStore(this);
    }
}
