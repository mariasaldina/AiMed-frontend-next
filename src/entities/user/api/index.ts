import { api } from '@/shared/api';
import type {
    Contacts,
    DoctorProfile,
    PatientProfile,
    Specialization,
    User,
} from '@/entities/user/model/user.types';
import axios from 'axios';

export const getUser = async () => {
    try {
        const { data } = await api.get<User>('/user/me');
        return data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 401) {
                return null;
            }
        }
        throw 'Неизвестная ошибка авторизации';
    }
};

export const editPatientProfile = async (
    fullName: string,
    profile: PatientProfile,
) => {
    try {
        const { data } = await api.put<User>('/user/patient-questionnaire', {
            fullName,
            ...profile,
        });
        return data;
    } catch (e) {
        throw 'Ошибка при редактировании профиля';
    }
};

export const editDoctorProfile = async (
    fullName: string,
    profile: DoctorProfile,
) => {
    try {
        const { data } = await api.put<User>('/user/doctor-questionnaire', {
            fullName,
            ...profile,
        });
        return data;
    } catch (e) {
        throw 'Ошибка при редактировании профиля';
    }
};

export const getSpecializationsList = async () => {
    try {
        const { data } = await api.get<Specialization[]>('/specialization');
        return data;
    } catch (e) {
        throw 'Ошибка получения списка специализаций';
    }
};

export const updateContacts = async (contacts: Contacts) => {
    try {
        await api.put('/contacts', contacts);
    } catch (e) {
        throw 'Ошибка при редактировании контактов';
    }
};
