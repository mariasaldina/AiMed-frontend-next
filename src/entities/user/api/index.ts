import { api } from '@/shared/api';
import type {
    Contacts,
    DoctorProfile,
    PatientProfile,
    Specialization,
    User,
} from '@/entities/user/model/user.types';
import axios from 'axios';
import { UserRoutes } from './routes';

export const getUser = async () => {
    try {
        const { data } = await api.get<User>(UserRoutes.GET_ME);
        return data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 401) {
                return null;
            }
        }
        throw new Error('Неизвестная ошибка авторизации');
    }
};

export const editPatientProfile = async (
    fullName: string,
    profile: PatientProfile,
) => {
    try {
        const { data } = await api.put<User>(UserRoutes.EDIT_PATIENT_PROFILE, {
            fullName,
            ...profile,
        });
        return data;
    } catch (e) {
        throw new Error('Ошибка при редактировании профиля');
    }
};

export const editDoctorProfile = async (
    fullName: string,
    profile: DoctorProfile,
) => {
    try {
        const { data } = await api.put<User>(UserRoutes.EDIT_DOCTOR_PROFILE, {
            fullName,
            ...profile,
        });
        return data;
    } catch (e) {
        throw new Error('Ошибка при редактировании профиля');
    }
};

export const getSpecializationsList = async () => {
    try {
        const { data } = await api.get<Specialization[]>(
            UserRoutes.GET_SPECIALIZATIONS,
        );
        return data;
    } catch (e) {
        throw new Error('Ошибка получения списка специализаций');
    }
};

export const updateContacts = async (contacts: Contacts) => {
    try {
        await api.put(UserRoutes.EDIT_CONTACTS, contacts);
    } catch (e) {
        throw new Error('Ошибка при редактировании контактов');
    }
};
