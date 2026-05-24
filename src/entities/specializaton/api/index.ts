import { api } from '@/shared/api';
import { Specialization } from '../model/types';
import { SpecializationRoutes } from './routes';

export const getSpecializationsList = async () => {
    try {
        const { data } = await api.get<Specialization[]>(
            SpecializationRoutes.GET_SPECIALIZATIONS,
        );
        return data;
    } catch (e) {
        throw new Error('Ошибка получения списка специализаций');
    }
};
