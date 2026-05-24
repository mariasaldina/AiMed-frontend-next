import { mapMessage } from '@/entities/message/model/mapper';
import { api } from '@/shared/api';
import { MessageDto } from '@/shared/api/dtos';
import { InviteDoctorRoutes } from './routes';

export const inviteDoctor = async (
    chatId: number,
    doctorId: number,
    content: string,
) => {
    const { data } = await api.post<MessageDto>(
        InviteDoctorRoutes.INVITE_DOCTOR,
        {
            chatId,
            doctorId,
            content,
        },
    );
    return mapMessage(data);
};
