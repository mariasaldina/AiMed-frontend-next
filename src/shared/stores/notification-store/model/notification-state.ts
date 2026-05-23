import { makeAutoObservable } from 'mobx';
import { Notification } from '@/entities/notification/model/notification.types';
import { RootStore } from '@/shared/stores';

export class NotificationState {
    read: Notification[] = [];
    unread: Notification[] = [];

    constructor(public root: RootStore) {
        makeAutoObservable(this);
    }
}
