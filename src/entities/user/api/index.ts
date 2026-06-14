import { api } from '@/shared/api';
import type { DoctorProfile, PatientProfile, User } from '../model/types';
import axios from 'axios';
import { UserRoutes } from './routes';
import { Contacts } from '@/shared/types/contacts';

export const getUser = async () => {
    try {
        const { data } = await api.get<User>(UserRoutes.GET_ME);
        return data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 401 || e.response?.status === 403) {
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

export const updateContacts = async (contacts: Contacts) => {
    try {
        await api.put(UserRoutes.EDIT_CONTACTS, contacts);
    } catch (e) {
        throw new Error('Ошибка при редактировании контактов');
    }
};
