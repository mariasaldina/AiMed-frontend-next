import { NotificationState } from './model/notification-state';
import { NotificationSync } from './model/notification-sync';
import { NotificationAsync } from './model/notification-async';
import { RootStore } from '..';

export class NotificationStore {
    state: NotificationState;
    sync: NotificationSync;
    async: NotificationAsync;

    constructor(public root: RootStore) {
        this.state = new NotificationState(root);
        this.sync = new NotificationSync(root, this.state);
        this.async = new NotificationAsync(root, this.state, this.sync);
    }
}
