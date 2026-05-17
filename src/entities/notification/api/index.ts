import { api } from '@/shared/api';
import { NotificationListDto } from './dtos';
import { NotificationRoutes } from './routes';

export const getNotifications = async () => {
    try {
        const { data } = await api.get<NotificationListDto>(
            NotificationRoutes.GET_NOTIFICATIONS,
        );
        return data;
    } catch (e) {
        throw new Error('Ошибка загрузки уведомлений');
    }
};

export const readNotifications = async (notificationIds: number[]) => {
    try {
        await api.patch(NotificationRoutes.READ_NOTIFICATIONS, {
            notificationIds,
        });
    } catch (e) {
        throw new Error('Ошибка обновления уведомлений');
    }
};
