'use client';

import ChatWindow from '@/widgets/chat-window/ui/ChatWindow';
import MessageList from '@/widgets/message-list/ui/MessageList';

const Chat = () => {
    return (
        <ChatWindow>
            <MessageList />
        </ChatWindow>
    );
};

export default Chat;
