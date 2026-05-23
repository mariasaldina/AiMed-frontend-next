'use client';

import { Home } from '@/pages/home/ui/Home';
import { Metadata } from 'next';

export const homeMetadata: Metadata = {
    title: 'Личный кабинет',
    description: 'Стартовая страница',
};

export default function Page() {
    return <Home />;
}
