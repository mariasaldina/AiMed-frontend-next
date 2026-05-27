import { Metadata } from 'next';
import { NotificationsPage } from '@/pages/notifications';

export const metadata: Metadata = {
    title: 'Уведомления',
    description: 'Страница уведомлений пользователя',
};

export default function Page() {
    return <NotificationsPage />;
}
