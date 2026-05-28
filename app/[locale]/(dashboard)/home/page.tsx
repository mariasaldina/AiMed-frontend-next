import { HomePage } from '@/pages/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Личный кабинет',
    description: 'Стартовая страница',
};

export default function Page() {
    return <HomePage />;
}
