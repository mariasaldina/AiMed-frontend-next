import { ContactsPage } from '@/pages/contacts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Контакты',
    description: 'Страница редактирования контактов',
};

export default function Page() {
    return <ContactsPage />;
}
