import { api } from '@/shared/api';
import { LoginCredentialsDto, SignUpCredentialsDto } from './dtos';
import axios from 'axios';

export const login = async (credentials: LoginCredentialsDto) => {
    try {
        await api.post('/auth/login', credentials);
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 401) {
                throw new Error('Неверный username или пароль');
            }
        }
        throw new Error('Неизвестная ошибка входа');
    }
};

export const logout = async () => {
    try {
        await api.post('auth/logout');
    } catch (e) {
        throw new Error('Ошибка при выходе');
    }
};

export const signUp = async (credentials: SignUpCredentialsDto) => {
    try {
        await api.post('/auth/sign-up', credentials);
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 409) {
                throw new Error('Пользователь с таким username уже существует');
            }
        }
        throw new Error('Неизвестная ошибка регистрации');
    }
};
