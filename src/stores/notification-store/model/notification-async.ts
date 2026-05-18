import { runInAction } from 'mobx';
import {
    getNotifications,
    readNotifications,
} from '@/entities/notification/api';
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
        try {
            this.root.settingsStore.sync.startLoading(
                'notifications/loadNotifications',
            );
            const { read, unread } = await getNotifications();

            runInAction(() => {
                this.state.read = read;
                this.state.unread = unread;
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
            throw e;
        } finally {
            this.root.settingsStore.sync.stopLoading(
                'notifications/loadNotifications',
            );
        }
    }

    async readNotifications() {
        try {
            this.root.settingsStore.sync.startLoading(
                'notifications/readNotifications',
            );
            await readNotifications(this.state.unread.map((n) => n.id));

            runInAction(() => {
                this.state.read = [...this.state.unread, ...this.state.read];
                this.state.unread = [];
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
            throw e;
        } finally {
            this.root.settingsStore.sync.stopLoading(
                'notifications/readNotifications',
            );
        }
    }
}
