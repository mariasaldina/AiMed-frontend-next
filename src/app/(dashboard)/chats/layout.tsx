'use client';

import ChatListFetcher from '@/features/chat/widgets/ChatListFetcher';
import { ReactNode } from 'react';

export default function ChatLayout({ children }: { children: ReactNode }) {
    return <ChatListFetcher>{children}</ChatListFetcher>;
}
