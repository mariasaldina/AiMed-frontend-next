import { Notification } from '@/entities/notification/model/notification.types';

export interface NotificationListDto {
    read: Notification[];
    unread: Notification[];
}
