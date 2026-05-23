'use client';

import { SignUpPage } from '@/pages/auth';
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
