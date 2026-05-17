export const ChatRoutes = {
    GET_CHATS: '/chat',
    CREATE_CHAT: '/chat',
    DELETE_CHAT: (chatId: number) => `/chat/${chatId}`,
    RENAME_CHAT: (chatId: number) => `/chat/${chatId}`,
};
