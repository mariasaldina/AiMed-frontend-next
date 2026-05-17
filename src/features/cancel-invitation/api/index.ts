import { api } from '@/shared/api';
import axios from 'axios';
import { CancelInvitationRoutes } from './routes';

export const cancelInvitation = async (invitationId: number) => {
    try {
        await api.post(CancelInvitationRoutes.CANCEL_INVITATION(invitationId));
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 403) {
                throw new Error('Недостаточно прав');
            }
            if (e.response?.status === 404) {
                throw new Error('Такого приглашения не существует');
            }
            if (e.response?.status === 409) {
                throw new Error('Невалидный статус приглашения');
            }
        }
        throw new Error('Ошибка отмены приглашения');
    }
};
