'use client';

import ChatWindow from '@/widgets/chat-window/ui/ChatWindow';
import MessageList from '@/widgets/message-list/ui/MessageList';

export function OpenChat() {
    return (
        <ChatWindow>
            <MessageList />
        </ChatWindow>
    );
}
