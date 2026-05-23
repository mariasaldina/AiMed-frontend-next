'use client';

import { ContactsPage } from '@/pages/profile';
import { Metadata } from 'next';

export const contactsMetadata: Metadata = {
    title: 'Контакты',
    description: 'Страница редактирования контактов',
};

export default function Page() {
    return <ContactsPage />;
}
