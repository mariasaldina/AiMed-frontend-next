import { api } from '@/shared/api';
import { LoginCredentialsDto, SignUpCredentialsDto } from './auth.types';
import axios from 'axios';

export const login = async (credentials: LoginCredentialsDto) => {
    try {
        await api.post('/auth/login', credentials);
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 401) {
                throw 'Неверный username или пароль';
            }
        }
        throw 'Неизвестная ошибка входа';
    }
};

export const logout = async () => {
    try {
        await api.post('auth/logout');
    } catch (e) {
        throw 'Ошибка при выходе';
    }
};

export const signUp = async (credentials: SignUpCredentialsDto) => {
    try {
        await api.post('/auth/sign-up', credentials);
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 409) {
                throw 'Пользователь с таким username уже существует';
            }
        }
        throw 'Неизвестная ошибка регистрации';
    }
};
