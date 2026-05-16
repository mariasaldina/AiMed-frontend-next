import { runInAction } from 'mobx';
import {
    getNotifications,
    readNotifications,
} from '@/features/notifications/api';
import { NotificationState } from './notification-state';
import { NotificationSync } from './notification-sync';
import { RootStore } from '@/stores';

export class NotificationAsync {
    constructor(
        public root: RootStore,
        public state: NotificationState,
        public sync: NotificationSync,
    ) {}

    async loadNotifications() {
        const { read, unread } = await this.root.settingsStore.async.run(
            'notifications/loadNotifications',
            getNotifications,
        );

        runInAction(() => {
            this.state.read = read;
            this.state.unread = unread;
        });
    }

    async readNotifications() {
        await this.root.settingsStore.async.run(
            'notifications/readNotifications',
            () => readNotifications(this.state.unread.map((n) => n.id)),
        );

        runInAction(() => {
            this.state.read = [...this.state.unread, ...this.state.read];
            this.state.unread = [];
        });
    }
}
