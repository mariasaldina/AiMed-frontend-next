import { mapMessage } from '@/entities/message/model/mapper';
import { Message } from '@/entities/message/model/message.types';
import { api } from '@/shared/api';
import { MessageDto } from '@/shared/api/contracts/message.dto';

interface SendMessageResponseDto {
    userMessage: MessageDto;
    assistantMessage: MessageDto;
}

export const sendMessage = async (
    content: string,
    chatId: number,
): Promise<{
    userMessage: Message;
    assistantMessage: Message;
}> => {
    const { data } = await api.post<SendMessageResponseDto>(`/chat/${chatId}`, {
        content,
    });
    return {
        userMessage: mapMessage(data.userMessage),
        assistantMessage: mapMessage(data.assistantMessage),
    };
};

export const findDoctorsApi = async (chatId: number): Promise<Message> => {
    const { data } = await api.post<MessageDto>(`/chat/${chatId}/doctors`);
    return mapMessage(data);
};

export const inviteDoctor = async (
    chatId: number,
    doctorId: number,
    content: string,
) => {
    const { data } = await api.post<MessageDto>('/invitations/invite', {
        chatId,
        doctorId,
        content,
    });
    return mapMessage(data);
};
