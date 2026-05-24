import { Notification } from '@/entities/notification/model/types';

export interface NotificationListDto {
    read: Notification[];
    unread: Notification[];
}
