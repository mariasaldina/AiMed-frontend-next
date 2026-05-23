'use client';

import { ChatLayout } from '@/pages/chats';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const chatsMetadata: Metadata = {
    title: 'Чат',
    description: 'Чат с медицинским ИИ-ассистентом',
};

export default function Layout({ children }: { children: ReactNode }) {
    return <ChatLayout>{children}</ChatLayout>;
}
