import { api } from '@/shared/api';
import axios from 'axios';
import { SendDoctorsResponseRoutes } from './routes';

export const sendDoctorsResponse = async (
    status: 'APPROVED' | 'REJECTED',
    invitationId: number,
) => {
    try {
        await api.post(
            SendDoctorsResponseRoutes.SEND_DOCTORS_RESPONSE(invitationId),
            {
                status,
            },
        );
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 404) {
                throw new Error('Такого приглашения не существует');
            }
            if (e.response?.status === 409) {
                throw new Error('Невалидный статус приглашения');
            }
        }
        throw new Error('Ошибка отправки ответа');
    }
};
