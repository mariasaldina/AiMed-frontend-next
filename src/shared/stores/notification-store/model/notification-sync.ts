import { RootStore } from '@/shared/stores';
import { NotificationState } from './notification-state';
import { makeAutoObservable } from 'mobx';

export class NotificationSync {
    constructor(
        public root: RootStore,
        public state: NotificationState,
    ) {
        makeAutoObservable(this);
    }
}
