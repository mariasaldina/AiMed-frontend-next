'use client';

import { SignUpPage } from '@/pages/sign-up';
import { Metadata } from 'next';

export const signUpMetadata: Metadata = {
    title: 'Регистрация',
    description: 'Страница регистрации',
    openGraph: {
        title: 'Регистрация',
        description: 'Создайте аккаунт',
        url: '/sign-up',
    },
};

export default function Page() {
    return <SignUpPage />;
}
