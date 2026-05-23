import { UserStore } from './user-store/user-store';
import { ChatStore } from './chat-store/chat-store';
import { MessageStore } from './message-store/message-store';
import { NotificationStore } from './notification-store/notification.store';
import { SettingsStore } from './settings-store/settings.store';
import { InvitationStore } from './invitation-store/invitation.store';

export class RootStore {
    userStore: UserStore;
    settingsStore: SettingsStore;
    chatStore: ChatStore;
    messageStore: MessageStore;
    notificationStore: NotificationStore;
    invitationStore: InvitationStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.settingsStore = new SettingsStore(this);
        this.chatStore = new ChatStore(this);
        this.messageStore = new MessageStore(this);
        this.notificationStore = new NotificationStore(this);
        this.invitationStore = new InvitationStore(this);
    }
}
