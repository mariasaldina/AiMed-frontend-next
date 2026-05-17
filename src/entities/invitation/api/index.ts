import { api } from '@/shared/api';
import { Invitation } from '../model/invitation.types';
import { InvitationRoutes } from './routes';

export const getInvitations = async () => {
    try {
        const { data } = await api.get<Invitation[]>(
            InvitationRoutes.GET_INVITATIONS,
        );
        console.log(data);
        return data;
    } catch (e) {
        throw new Error('Ошибка загрузки приглашений');
    }
};
