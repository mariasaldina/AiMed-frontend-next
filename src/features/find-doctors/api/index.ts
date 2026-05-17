import { mapMessage } from '@/entities/message/model/mapper';
import { Message } from '@/entities/message/model/message.types';
import { api } from '@/shared/api';
import { MessageDto } from '@/shared/api/contracts/message.dto';
import { FindDoctorsRoutes } from './routes';

export const findDoctorsApi = async (chatId: number): Promise<Message> => {
    const { data } = await api.post<MessageDto>(
        FindDoctorsRoutes.FIND_DOCTORS(chatId),
    );
    return mapMessage(data);
};
