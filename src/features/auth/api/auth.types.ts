import { UserRole } from '@/entities/user/model/user.types';

export interface LoginCredentialsDto {
    username: string;
    password: string;
}

export interface SignUpCredentialsDto {
    username: string;
    password: string;
    fullName: string;
    role: UserRole;
}
