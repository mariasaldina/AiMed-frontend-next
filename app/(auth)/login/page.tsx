'use client';

import { LoginPage } from '@/pages/login';
import { Metadata } from 'next';

export const loginMetadata: Metadata = {
    title: 'Вход',
    description: 'Страница авторизации',
    openGraph: {
        title: 'Авторизация',
        description: 'Войдите в аккаунт',
        url: '/login',
    },
};

export default function Page() {
    return <LoginPage />;
}
