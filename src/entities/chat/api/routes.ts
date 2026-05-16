export const ChatRoutes = {
    SEND_MESSAGE: (chatId: number) => `/chat/${chatId}`,
    FIND_DOCTORS: (chatId: number) => `/chat/${chatId}/doctors`,
    INVITE_DOCTOR: '/invitations/invite',
};
