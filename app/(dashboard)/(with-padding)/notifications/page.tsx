'use client';

import { Metadata } from 'next';
import { NotificationsPage } from '@/pages/notifications';

export const notificationsMetadata: Metadata = {
    title: 'Уведомления',
    description: 'Страница уведомлений пользователя',
};

export default function Page() {
    return <NotificationsPage />;
}
