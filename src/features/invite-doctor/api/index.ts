import { mapMessage } from '@/entities/message/model/mapper';
import { api } from '@/shared/api';
import { MessageDto } from '@/shared/api/contracts/message.dto';
import { ChatRoutes } from '../../../entities/chat/api/routes';

export const inviteDoctor = async (
    chatId: number,
    doctorId: number,
    content: string,
) => {
    const { data } = await api.post<MessageDto>(ChatRoutes.INVITE_DOCTOR, {
        chatId,
        doctorId,
        content,
    });
    return mapMessage(data);
};
